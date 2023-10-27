import { NextRequest, NextResponse } from 'next/server';
import { encryptBlob } from '../../utils/encrypt';
import fs from 'fs';
const unixTime = Date.now();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const filename = formData.get("filename") as string || "userName";

  if (!file) {
    console.log("No file found");
    console.log(formData);
    return NextResponse.json({ success: false });
  }

  const buffer = await file.arrayBuffer();
  const dataView = new DataView(buffer);

  const newFilename = `${filename}_${unixTime}`;

  try {
    fs.writeFileSync(`./public/uploads/${newFilename}`, dataView);
  } catch (error) {
    // Handle the error
  }  // Process the form data

  return NextResponse.json({ success: true });
}
