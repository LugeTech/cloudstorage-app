import Image from 'next/image'
import FileUploadForm from './components/FileUploadForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center">Cloud App</h1>
      <div><FileUploadForm/></div>
    </main>
  )
}
