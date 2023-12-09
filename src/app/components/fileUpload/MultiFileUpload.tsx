"use client";
import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import axios, { CancelTokenSource } from "axios";
//@ts-ignore
import FilePreview from "./FilePreview";
import UploadError from "./UploadError";
import getIconForFileType from "@/app/utils/GetIconForFileType";
export const revalidate = 0;

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  // const [otherFILES, setOtherFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[],
  ) => {
    setFiles([...files, ...acceptedFiles]);
    // get all imagees files, not sure why i had this in the beginning
    // const imageFiles = acceptedFiles.filter((file) =>
    //   file.type.startsWith("image/"),
    // );

    // const otherFiles = acceptedFiles.filter(
    //   (file) => !file.type.startsWith("image/"),
    // );
    // setOtherFiles([...otherFILES, ...otherFiles]);

    const filePreviews = getIconForFileType(acceptedFiles); // files here might not be the updated in which case i will have to use a useEffect

    setImagePreviews([...imagePreviews, ...filePreviews]);

    setUploadProgress([
      ...uploadProgress,
      ...Array(acceptedFiles.length).fill(0, 0, acceptedFiles.length),
    ]);
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
    cancelUpload(index); // keep an eye on this, not tested
  };

  const uploadFile = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append("file", file);
    const cancelSource = axios.CancelToken.source();
    try {
      await axios.post(process.env.NEXT_PUBLIC_API_PATH_UPLOAD!, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!,
          );
          setUploadProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[index] = percentCompleted;
            return updatedProgress;
          });
        },
        cancelToken: cancelSource.token,
      });
      // NOTE upload successful add some kinda feedback here - show download links
      setUploading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // NOTE user cancelled or removed file        return;
      }
      setUploadErrors([
        ...uploadErrors,
        `Error uploading ${file.name}: ${error}`,
      ]);
    }
  };

  const cancelTokenSources: CancelTokenSource[] = [];
  const cancelUpload = (index: number) => {
    cancelTokenSources[index].cancel("Upload canceled by user");
  };

  const uploadFiles = async () => {
    setUploading(true);

    files.forEach(async (file, index) => {
      const cancelSource = axios.CancelToken.source();
      cancelTokenSources[index] = cancelSource;
      // NOTE create blob or other modification of the file here
      await uploadFile(file, index);
    });
    // at this pooint update the front end
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Dropzone onDrop={handleDrop} multiple={true}>
        {({ getRootProps, getInputProps }) => (
          <div className="w-full h-full hover:cursor-pointer border-2 border-dashed border-gray-300 bg-sky-100 p-4 rounded flex flex-col items-center justify-center w-60 h-30">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-gray-500 text-center w-full h-full">
                Drag and drop some files here
              </p>
              <p className="text-gray-500 text-center w-full h-full">
                Or click to select files
              </p>
            </div>
          </div>
        )}
      </Dropzone>

      <div className="w-full ">
        <FilePreview
          uploading={uploading}
          imagePreviews={imagePreviews}
          files={files}
          uploadProgress={uploadProgress}
          removeFile={removeFile}
          cancelUpload={cancelUpload}
        />
      </div>
      <UploadError uploadErrors={uploadErrors} />
      <button
        onClick={uploadFiles}
        className="mt-2 rounded-md bg-black px-4 py-2 text-white"
      >
        Upload Files
      </button>
    </div>
  );
};

export default FileUpload;
