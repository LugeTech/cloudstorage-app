import Link from "next/link";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MultiFileUpload from "@/app/components/fileUpload/MultiFileUpload";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Nav = () => {
  return (
    <div className="flex flex-col  bg-white w-full">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#ffffff] border-b">
        <Link className="flex items-center justify-center" href="#">
          <CloudIcon className="h-4 w-4 sm:h-6 sm:w-6" />
          <span className="ml-1 sm:text-lg font-semibold text-gray-700">
            STORE IT
          </span>
          {/* <span className="sr-only">STORE IT</span> */}
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 justify-center items-center">
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
          <Link className="" href="#">
            <UserButton afterSignOutUrl="/" />
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Nav;

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
