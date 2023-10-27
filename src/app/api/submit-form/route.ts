import { NextRequest, NextResponse } from 'next/server';
import { encryptBlob } from '../../utils/encrypt';
import fs from 'fs';
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const filename = formData.get("filename") as string;

  if (!file) {
    return;
  }

  const buffer = await file.arrayBuffer();
  const dataView = new DataView(buffer);

  fs.writeFileSync(filename, dataView);
  // Process the form data

  return NextResponse.json({ success: true });
}
