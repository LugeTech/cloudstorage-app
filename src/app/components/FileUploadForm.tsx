'use client'
import React, { useState } from 'react';

const FileUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [newFileName, setNewFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFileName(e.target.value);
  };

  const handleUpload = () => {
    // You can implement the file upload logic here.
    if (file) {
      // Rename the file
      const renamedFile = new File([file], newFileName || file.name, {
        type: file.type,
      });

      // Now you can upload the renamed file using an HTTP request, e.g., Axios.
      // Implement your upload logic here.

      // Clear the form after upload
      setFile(null);
      setNewFileName('');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        
        placeholder="New File Name"
        value={newFileName}
        onChange={handleRenameChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploadForm;
