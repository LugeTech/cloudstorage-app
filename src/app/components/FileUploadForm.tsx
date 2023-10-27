'use client'
import React, { useState } from 'react';
import { createBlobFromFile, writeBlobToFileSystem, writeBinaryFileToFileSystem} from '@/app/utils/FileOperations'

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

  const handleUpload = async (formData:FormData) => {
    const filename = formData.get('filename') as string
    // console.log('handleUpload', filename)
    const file = formData.get('file') as string

    // const blob = await writeBinaryFileToFileSystem(file, filename);

    const blob = await createBlobFromFile(new File([file], filename || 'test.txt'))
    console.log('handleUpload', blob)
    return
    console.log('handleUpload', file)

    // if (file) {
    //   // Rename the file
    //   const renamedFile = new File([file], newFileName || file.name, {
    //     type: file.type,
    //   });

      // Now you can upload the renamed file using an HTTP request, e.g., Axios.
      // Implement your upload logic here.

      // Clear the form after upload
      setFile(null);
      setNewFileName('');
    }
  };

  return (
    <div className=' flex flex-row md:flex-row'>
      <form>
        <label htmlFor="file-upload">Upload a File</label>
        <input name='file' id="file-upload" type="file" onChange={handleFileChange} />
        <input name='filename' className='dark:text-neutral-950'
          type="text"
          placeholder="New File Name"
          value={newFileName}
          onChange={handleRenameChange}
        />
        <button type='submit' formAction={handleUpload}>Upload</button>
      </form>
    </div>
  );
};

export default FileUploadForm;
