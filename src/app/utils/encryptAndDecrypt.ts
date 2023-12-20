"use server";
// THIS VERSION IS DEPRICATED BUT WORKS.
// ONLY ISSUE IS EFFICIENCY
// THIS VERSION READS THE ENTIRE FILE INTO MEMORY
//this version streams the file in chunks instead of reading the entire file into memory
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
    //@ts-ignore -- not sure what tyoe i should put here so i'm ignoring it
    input.pipe(cipher).pipe(output);

    input.on("error", reject);
    output.on("error", reject);
    output.on("finish", () => resolve("Finished encrypt successfully"));
  });
}

function encryptBuffer(inputBuffer: Buffer): Buffer {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  // Update the cipher with the input buffer
  const encryptedBuffer = Buffer.concat([
    cipher.update(inputBuffer),
    cipher.final(),
  ]);

  // Prepend the IV to the encrypted buffer
  const resultBuffer = Buffer.concat([iv, encryptedBuffer]);

  return resultBuffer;
}

function decryptFile(inputFile: string, outputFile: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const input: fs.ReadStream = fs.createReadStream(inputFile, {
      start: 0,
      end: 15,
    });

    let iv: Buffer = Buffer.alloc(0);

    input.on("data", (data: Buffer) => {
      iv = Buffer.concat([iv, data]);
    });

    input.on("end", () => {
      if (iv.length !== 16) {
        reject(new Error("Invalid IV length"));
        return;
      }

      const decipher: crypto.Decipher = crypto.createDecipheriv(
        algorithm,
        key,
        iv,
      );
      const output: fs.WriteStream = fs.createWriteStream(outputFile);

      const fileInput: fs.ReadStream = fs.createReadStream(inputFile, {
        start: 16,
      });

      //@ts-ignore -- so take the rest of the data run it through the cypher we created then write it to the output file
      fileInput.pipe(decipher).pipe(output);

      fileInput.on("end", () => {
        resolve("Finished decrypt successfully");
      });

      fileInput.on("error", reject);
    });

    input.on("error", reject);
  });
}

function decryptBuffer(encryptedBuffer: Buffer): Buffer {
  // Extract the IV from the beginning of the encrypted buffer
  const iv = encryptedBuffer.subarray(0, 16);

  // Create a decipher using the same algorithm and key
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  // Update the decipher with the remaining encrypted buffer
  const decryptedBuffer = Buffer.concat([
    decipher.update(encryptedBuffer.subarray(16)),
    decipher.final(),
  ]);

  return decryptedBuffer;
}

export { encryptFile, decryptFile, encryptBuffer, decryptBuffer };
