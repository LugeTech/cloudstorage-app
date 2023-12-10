import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/app/components/Navbar";
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import Nav from "@/components/Nav";
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: "normal",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
