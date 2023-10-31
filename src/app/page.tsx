"use client";
// import DragAndDrop from './components/DragAndDrop'
import { UserButton, useUser } from "@clerk/nextjs";
// import FileUploadForm from './components/FileUploadForm'
import MultiFileUpload from './components/fileUpload/MultiFileUpload';

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded || !isSignedIn) {
    return (

      <button onClick={() => window.location.href = '/sign-in'}>Sign In</button>
    );
  }
  else {
    return (
      <main className="flex flex-col items-center justify-center gap-4 w-full">
        {<h1 className="text-4xl font-bold text-center pt-16">Cloud App</h1>}
        {/* <DragAndDrop /> */}
        <MultiFileUpload />
        <UserButton afterSignOutUrl="/" />
      </main>
    )
  }
}
