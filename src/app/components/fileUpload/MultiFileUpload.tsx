
'use client';
import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import axios, { CancelTokenSource } from "axios";
//@ts-ignore
import ProgressBar from "@ramonak/react-progress-bar";
import FilePreview from "./FilePreview";
import UploadError from "./UploadError";
export const revalidate = 0;

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [otherFILES, setOtherFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setFiles([...files, ...acceptedFiles]);
    const imageFiles = acceptedFiles.filter((file) => file.type.startsWith("image/"));
    const otherFiles = acceptedFiles.filter((file) => !file.type.startsWith("image/"));
    setOtherFiles([...otherFILES, ...otherFiles]);
    const filePreviews = acceptedFiles.map((file) => {
      if (file.type.startsWith("image/")) {
        return URL.createObjectURL(file);
      } else {
        return "/no_image.svg";
      }
    });

    setImagePreviews([...imagePreviews, ...filePreviews]);
    setUploadProgress([...uploadProgress, ...Array(acceptedFiles.length).fill(0, 0, acceptedFiles.length)]);
    // Clear any previous upload errors
    setUploadErrors([]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    const updatedProgress = [...uploadProgress];
    updatedProgress.splice(index, 1);
    setFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setUploadProgress(updatedProgress);
    cancelUpload(index);
  };

  const uploadFile = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append("file", file);
    const cancelSource = axios.CancelToken.source();
    try {
      await axios.post(process.env.NEXT_PUBLIC_API_PATH + "/submit-form", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          setUploadProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[index] = percentCompleted;
            return updatedProgress;
          });
        },
        cancelToken: cancelSource.token,
      });
      // NOTE upload successful add some kinda feedback here - show download links
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTE user cancelled or removed file        return;
      }
      setUploadErrors([...uploadErrors, `Error uploading ${file.name}: ${error}`]);
    }
  };

  const cancelUpload = (index: number) => {
    cancelTokenSources[index].cancel("Upload canceled by user");
  };

  const cancelTokenSources: CancelTokenSource[] = [];

  const uploadFiles = async () => {
    files.forEach(async (file, index) => {
      const cancelSource = axios.CancelToken.source();
      cancelTokenSources[index] = cancelSource;
      // NOTE create blob or other modification of the file here
      await uploadFile(file, index);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <Dropzone onDrop={handleDrop} multiple={true}>
        {({ getRootProps, getInputProps }) => (
          <div className="border-2 border-dashed border-gray-300 bg-sky-100 p-4 rounded flex flex-col items-center justify-center w-60 h-60">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-gray-500 text-center">Drag and drop some files here, or click to select files</p>
            </div>
          </div>
        )}
      </Dropzone>
      <div className="flex flex-col  p-4 gap-2 ">
        <FilePreview imagePreviews={imagePreviews} files={files} uploadProgress={uploadProgress} removeFile={removeFile} />
        <UploadError uploadErrors={uploadErrors} />
        <button
          onClick={uploadFiles}
          className="mt-2 rounded-md bg-black px-4 py-2 text-white"
        >
          Upload Files
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
