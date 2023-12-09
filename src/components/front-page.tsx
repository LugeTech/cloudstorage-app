/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/dDnPXDWEayv
 */
import Link from "next/link";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MultiFileUpload from "@/app/components/fileUpload/MultiFileUpload";

export function FrontPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white w-full">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#ffffff] border-b">
        <Link className="flex items-center justify-center" href="#">
          <CloudIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold text-gray-700">
            STORE IT
          </span>
          <span className="sr-only">STORE IT</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center bg-gray-100 py-12">
        <Card className="w-full max-w-xl mx-4">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold">Upload your files</h2>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 bg-gray-50 w-full h-full">
            <MultiFileUpload />
          </CardContent>
        </Card>
      </main>
      <footer className="flex items-center justify-center h-14 border-t">
        <p className="text-sm text-gray-500">
          © Store It. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
