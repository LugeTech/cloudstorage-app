'use client'
import React, { ChangeEvent, useState } from 'react';
import { submitForm } from '@/app/utils/FileOperations'
import DragAndDrop from '@/app/components/DragAndDrop';

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
    const fileAsBlob = getFileFromFormData(formData, 'file') as Blob;
    formData.delete('file');
    formData.set('file', fileAsBlob);
    await submitForm(formData);
  };

  return (
    <div className=' flex md:flex-col'>
      <form>
        <label htmlFor="file-upload">Upload a File</label>
        <input name='file' id="file-upload" type="file" onChange={handleFileChange} />
        <input name='filename' className='dark:text-neutral-950 flex flex-col'
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
