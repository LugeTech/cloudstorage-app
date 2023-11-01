import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
const unixTime = Date.now();

export async function POST(request: NextRequest) {
  console.log("POST");
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const filename = formData.get("filename") as string || file.name;

  if (!file) {
    console.log("No file found");
    console.log(formData);
    return NextResponse.json({ success: false });
  }

  // Create a Blob directly from the File
  const blob = new Blob([file]);

  const newFilename = `${filename}_${unixTime}`;

  try {
    // Convert the Blob to a Buffer
    const blobBuffer = Buffer.from(await blob.arrayBuffer());

    // Write the Buffer data to the file
    fs.writeFileSync(`./public/uploads/${newFilename}`, blobBuffer);
  } catch (error) {
    // Handle the error
    console.error(error);
    return NextResponse.json({ success: false });
  }

  // Process the form data
  return NextResponse.json({ success: true });
}
