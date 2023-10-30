
'use client';
import React, { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import axios, { CancelTokenSource } from "axios";
//@ts-ignore
import ProgressBar from "react-progress-bar-plus";

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
        return "no_image.jpg";
      }
    });

    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
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
      await axios.post("YOUR_BACKEND_UPLOAD_URL", formData, {
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
      // Handle successful file upload
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle cancelation if needed
        return;
      }
      // Handle upload error
      setUploadErrors([...uploadErrors, `Error uploading ${file.name}: ${error}`]);
    }
  };

  const cancelUpload = (index: number) => {
    // Cancel the ongoing upload request by canceling the associated cancel token
    cancelTokenSources[index].cancel("Upload canceled by user");
  };

  const cancelTokenSources: CancelTokenSource[] = [];

  const uploadFiles = () => {
    files.forEach((file, index) => {
      const cancelSource = axios.CancelToken.source();
      cancelTokenSources[index] = cancelSource;
      uploadFile(file, index);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <Dropzone onDrop={handleDrop} multiple={true}>
        {({ getRootProps, getInputProps }) => (
          <div className="border-2 border-dashed border-gray-300 bg-sky-100 p-4 rounded flex flex-col items-center justify-center w-60 h-60">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-gray-500 text-center">Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        )}
      </Dropzone>
      <div className="mt-4 ">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="mb-4 flex flex-col items-center">
            <img src={preview} alt={`Image ${index}`} width="100" />
            <p className="mt-2 text-gray-600 text-sm text-center">{files[index].name}</p>
            <ProgressBar
              completed={uploadProgress[index]}
              bgColor="#4caf50"
              labelAlignment="center"
              height="20px"
            />
            <button
              onClick={() => removeFile(index)}
              className="ml-2 mt-2 rounded-md bg-red-500 px-2 py-1 text-white"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {uploadErrors.map((error, index) => (
          <div key={index} className="text-red-600">
            {error}
          </div>
        ))}
      </div>
      <button
        onClick={uploadFiles}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Upload Files
      </button>
    </div>
  );
};

export default FileUpload;
