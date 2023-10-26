
import fs from 'fs';
export async function createBlobFromFile(file: File): Promise<Blob> {
  const buffer = await file.arrayBuffer();
  return new Blob([buffer]);
}

export async function writeBlobToFileSystem(blob: Blob, path: string): Promise<void> {
  const buffer = await blob.arrayBuffer() as unknown as Buffer; // any issues this is the first place to look
  await writeBinaryFileToFileSystem(buffer, path);
}

export async function writeBinaryFileToFileSystem(
  file: Buffer,
  path: string
): Promise<void> {
  await fs.promises.writeFile(path, file);
}
