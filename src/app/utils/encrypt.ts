"use server"
import crypto from "crypto";

export async function encryptBlob(blob: Blob): Promise<Blob> {
  const emptyBlob = new Blob([]);
  // Generate a symmetric encryption key.
  const key = crypto.randomBytes(32);

  // Encrypt the blob data using the symmetric encryption key.
  const encryptedBlob = crypto.createCipheriv("aes-256-cbc", key, crypto.randomBytes(16)).update(blob).final();

  // Save the encrypted blob data to a new blob node.
  const newBlob = new Blob(encryptedBlob);

  // Delete the original blob node.
  blob = emptyBlob // Return the encrypted blob node.
  return newBlob;
}
