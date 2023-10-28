"use client";
import DragAndDrop from './components/DragAndDrop'
import { UserButton, useUser } from "@clerk/nextjs";
import FileUploadForm from './components/FileUploadForm'

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded || !isSignedIn) {
    return (
      
      <button onClick={() => window.location.href = '/sign-in'}>Sign In</button>
    );
  }
  else{
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        {<h1 className="text-4xl font-bold text-center">Cloud App</h1>}
        {/* <div><FileUploadForm /></div> */}
        <DragAndDrop />
        <UserButton afterSignOutUrl="/"/>
      </main>
    )
  }
}
