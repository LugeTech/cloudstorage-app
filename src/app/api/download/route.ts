import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { decryptBuffer } from "@/app/utils/encryptAndDecrypt";

const unixTime = Date.now();

export async function POST(request: NextRequest) {
  console.log("Download endpoint");

  //get user info and cross refence with database to get file info
  // make sure file exists and maybe load first chunk with fs and create buffer
  // get all details from the frontend sent in clerk token and this formdata
  const formData = await request.formData();

  try {
    // pass the encrypted data through the decryptbuffer function
    // not 100% sure but maybe we save this decrypted file to a temp area to create a download link that will be deleted after the file is downloaded
  } catch (error) {
    // Handle the error
    console.error(error);
    return NextResponse.json({ success: false });
  }

  // Process the form data
  return NextResponse.json({ success: true });
}
