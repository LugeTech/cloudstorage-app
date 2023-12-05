import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { encryptBuffer } from "@/app/utils/encryptAndDecrypt";

const unixTime = Date.now();

export async function POST(request: NextRequest) {
  console.log("POST");

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const filename = (formData.get("filename") as string) || file.name;

  if (!file) {
    console.log("No file found");
    console.log(formData);
    return NextResponse.json({ success: false });
  }

  const newFilename = `${filename}_${unixTime}`;

  try {
    // Convert the File to a Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Encrypt the Buffer
    const encryptedBuffer = encryptBuffer(fileBuffer);

    // Write the encrypted Buffer directly to disk
    fs.writeFileSync(`./public/uploads/${newFilename}`, encryptedBuffer);
  } catch (error) {
    // Handle the error
    console.error(error);
    return NextResponse.json({ success: false });
  }

  // Process the form data
  return NextResponse.json({ success: true });
}
