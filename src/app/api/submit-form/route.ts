import { NextRequest, NextResponse } from 'next/server';
import { encryptBlob } from '../../utils/encrypt';
import fs from 'fs';
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const filename = formData.get("filename") as string || "default";

  if (!file) {
    console.log("No file found");
    console.log(formData);
    return NextResponse.json({ success: false });
  }

  const buffer = await file.arrayBuffer();
  const dataView = new DataView(buffer);

  fs.writeFileSync(`./public/uploads/${filename}`, dataView);
  // Process the form data

  return NextResponse.json({ success: true });
}
