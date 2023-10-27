'use client'
import React, { ChangeEvent, useState } from 'react';
import { submitForm } from '@/app/utils/FileOperations'
import { base64StringToBlob } from 'blob-util';

function getFileFromFormData(formData: FormData, fieldName: string): Blob | null {
  if (formData.has(fieldName)) {
    const file = formData.get(fieldName) as File;
    return new Blob([file], { type: file.type });
  }
  return null;
}
const FileUploadForm: React.FC = () => {
  const [newFileName, setNewFileName] = useState('');
  const [inputFile, setInputFile] = useState<File | null>(null);
  // const [FileAsBlob, setFileAsBlob] = useState<
  //   Blob | null
  // >(null);


  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFileName(e.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0];

  };

  const handleUpload = async (formData: FormData) => {
    const filename = formData.get('filename') as string
    // setFileAsBlob(getFileFromFormData(formData, 'file'));
    // const fileAsBlob = getFileFromFormData(formData, 'file') as Blob;

    // console.log('handleUpload', fileAsBlob)
    // const file = formData.get('file') as File
    // const blob = await writeBinaryFileToFileSystem(FileAsBase64, filename);
    await submitForm(formData);
    // const blob = await createBlobFromFile(new File([FileAsBase64], filename || 'test.txt'))
    // console.log('handleUpload', blob)

    // console.log('handleUpload', file)
    // const blob = base64StringToBlob(FileAsBase64);
    // console.log('handleUpload', blob)
    //
    // if (file) {
    //   // Rename the file
    //   const renamedFile = new File([file], newFileName || file.name, {
    //     type: file.type,
    //   });
    //
    //   // Now you can upload the renamed file using an HTTP request, e.g., Axios.
    //   // Implement your upload logic here.
    //
    //   // Clear the form after upload
    //   setFile(null);
    //   setNewFileName('');
    // }
  };

  return (
    <div className=' flex flex-row md:flex-row'>
      <form>
        <label onChange={handleFileChange} htmlFor="file-upload">Upload a File</label>
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
