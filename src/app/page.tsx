"use client";
import { UserButton, useUser } from "@clerk/nextjs";

import Navbar from "@/app/components/Navbar";
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
      <main className="flex min-h-screen flex-col items-center p-24">
        <Navbar />
        <UserButton afterSignOutUrl="/"/>
        {<h1 className="text-4xl font-bold text-center">Cloud App</h1>}
        <MultiFileUpload />
      </main>
    )
  }
}
