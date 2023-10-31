import ProgressBar from '@ramonak/react-progress-bar';
import Image from 'next/image';
type Props = {
  imagePreviews: string[],
  files: File[],
  uploadProgress: number[],
  removeFile: (index: number) => void,
}
const AFileDisplay = ({ imagePreviews, files, uploadProgress, removeFile }: Props) => {
  return (
    <div className="flex  w-full h-full p-4 gap-2 flex-wrap justify-center items-center ">
      {imagePreviews.map((preview, index) => (
        <div key={index} className="flex flex-col items-center">
          <Image src={preview} alt={`Image ${index}`} width={100} height={100} className="object-cover w-24 h-24" />
          <p className="mt-2 text-gray-600 text-sm text-center">
            {files[index].name.length > 10
              ? files[index].name.substring(0, 10) + '...' // If the name is longer than 20 characters, add ellipsis.
              : files[index].name}
          </p>
          {uploadProgress[index] > 0 && <ProgressBar completed={uploadProgress[index]} className="my-1 w-24 px-2" bgColor="#4caf50" height="12px" labelSize='12px' />}
          <button
            onClick={() => removeFile(index)}
            className=" rounded-md bg-red-500 px-2 py-1 text-white"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default AFileDisplay 
