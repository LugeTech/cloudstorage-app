"use server";
import * as crypto from "crypto";
import * as fs from "fs";

const originalKey: string = process.env.ORIGINAL_KEY as string;
const algorithm: string = process.env.ALGORITHM as string;

const key: Buffer = Buffer.alloc(32, originalKey, "utf-8");

function decryptFile(inputFile: string, outputFile: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output: fs.WriteStream = fs.createWriteStream(outputFile);

    // Read the IV from the beginning of the input file
    const input: fs.ReadStream = fs.createReadStream(inputFile, { end: 15 });

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

      // Pipe the decrypted data to the output file
      input.pipe(decipher).pipe(output);

      decipher.on("end", () => {
        resolve("Finished decrypt successfully");
      });

      decipher.on("error", reject);
      output.on("error", reject);
    });

    input.on("error", reject);
  });
}

function decryptBuffer(encryptedBuffer: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // Extract the IV from the beginning of the encrypted buffer
    const iv = encryptedBuffer.subarray(0, 16);

    // Create a decipher using the same algorithm and key
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    const decryptedChunks: Buffer[] = [];

    decipher.on("data", (chunk: Buffer) => {
      decryptedChunks.push(chunk);
    });

    decipher.on("end", () => {
      const decryptedBuffer = Buffer.concat(decryptedChunks);
      resolve(decryptedBuffer);
    });

    decipher.on("error", reject);

    // Push the remaining encrypted buffer to the decipher this is after the salt, this is the actual file
    decipher.write(encryptedBuffer.subarray(16));
    decipher.end();
  });
}

export { decryptFile, decryptBuffer };
