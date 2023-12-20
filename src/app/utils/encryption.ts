"use server";
import * as crypto from "crypto";
import * as fs from "fs";

const originalKey: string = process.env.ORIGINAL_KEY as string;
const algorithm: string = process.env.ALGORITHM as string;

const key: Buffer = Buffer.alloc(32, originalKey, "utf-8");

function encryptFile(inputFile: string, outputFile: string): Promise<string> {
  const iv: Buffer = crypto.randomBytes(16);
  const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, key, iv);

  const input: fs.ReadStream = fs.createReadStream(inputFile);
  const output: fs.WriteStream = fs.createWriteStream(outputFile);

  // Write the IV to the beginning of the output file
  output.write(iv);

  return new Promise((resolve, reject) => {
    input.pipe(cipher).pipe(output);

    input.on("error", reject);
    output.on("error", reject);
    output.on("finish", () => resolve("Finished encrypt successfully"));
  });
}

function encryptBuffer(inputBuffer: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const encryptedChunks: Buffer[] = [];

    cipher.on("data", (chunk: Buffer) => {
      encryptedChunks.push(chunk);
    });

    cipher.on("end", () => {
      // Prepend the IV to the encrypted buffer
      const resultBuffer = Buffer.concat([iv, ...encryptedChunks]);
      resolve(resultBuffer);
    });

    cipher.on("error", reject);

    // Push the input buffer to the cipher
    cipher.write(inputBuffer);
    cipher.end();
  });
}

export { encryptFile, encryptBuffer };
