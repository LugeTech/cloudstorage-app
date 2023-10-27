import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    // No file was uploaded
    return;
  }

  const buffer = await file.arrayBuffer();
  const dataView = new DataView(buffer);

  fs.writeFileSync("./uploads/" + file.name, dataView);
  // Process the form data

  return NextResponse.json({ success: true });
}
