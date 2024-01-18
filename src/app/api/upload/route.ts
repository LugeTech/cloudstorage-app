import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { encryptBuffer } from "@/app/utils/encryption";
import { getUserData } from "@/app/utils/functions";
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
    const user = await getUserData();
    console.log(user);

    // Folder name
    //const folderName = user?.id;
    //console.log(folderName);
    // Convert the File to a Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Encrypt the Buffer
    const encryptedBuffer = await encryptBuffer(fileBuffer);

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
