import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { decryptBuffer } from "@/app/utils/decryption";

const unixTime = Date.now();

export async function GET(request: NextRequest) {
  console.log("Download endpoint");
  const filePath: string = "./public/uploads/christena.jpg";

  function readFileToBuffer(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  //get user info and cross refence with database to get file info
  // make sure file exists and maybe load first chunk with fs and create buffer
  // get all details from the frontend sent in clerk token and this formdata
  // const formData = await request.formData();

  try {
    // pass the encrypted data through the decryptbuffer function
    // not 100% sure but maybe we save this decrypted file to a temp area to create a download link that will be deleted after the file is downloaded
    const fileAsBuffer = await readFileToBuffer(filePath);

    const decryptedBuffer = await decryptBuffer(fileAsBuffer);
    fs.writeFileSync(`./public/uploads/file.jpg`, decryptedBuffer);
  } catch (error) {
    // Handle the error
    console.error(error);
    return NextResponse.json({ success: false, error: error });
  }

  // Process the form data
  return NextResponse.json({ success: true });
}
