import ProgressBar from '@ramonak/react-progress-bar';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
type Props = {
  imagePreviews: string[],
  files: File[],
  uploadProgress: number[],
  removeFile: (index: number) => void,
  cancelUpload: (index: number) => void,
  uploading: boolean
}
const AFileDisplay = ({ imagePreviews, files, uploadProgress, removeFile, cancelUpload, uploading }: Props) => {
  console.log(uploading)
  return (
    <div className="flex  w-full h-full p-4 gap-2 flex-wrap justify-center items-center ">
      {imagePreviews.map((preview, index) => (
        <div key={index} className="relative flex flex-col items-center">
          <Image src={preview} alt={`Image ${index}`} width={96} height={96} className="object-cover w-24 h-24" />
          <AiOutlineClose className="absolute top-2 right-2 bg-red-500 text-white cursor-pointer" onClick={() => removeFile(index)} />

          <p className="mt-2 text-gray-600 text-sm text-center">
            {files[index].name.length > 12
              ? files[index].name.substring(0, 12) + '...' // If the name is longer than 20 characters, add ellipsis.
              : files[index].name}
          </p>
          {uploadProgress[index] > 0 && <ProgressBar completed={uploadProgress[index]} className="my-1 w-24 px-2" bgColor="#4caf50" height="12px" labelSize='12px' />}


          {uploading && <button
            onClick={() => cancelUpload(index)}
            className=" rounded-md bg-orange-500 px-2 py-1 text-white"
          >
            Cancel
          </button>}
        </div>
      ))}
    </div>
  )
}

export default AFileDisplay 
