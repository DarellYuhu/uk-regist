import { minio } from "@/lib/minio";

export const uploadFile = async (file: File) => {
  const arrBuf = await file.arrayBuffer();
  const newName = `${Date.now()}_${file.name}`;
  const buffer = Buffer.from(arrBuf);
  await minio.putObject("file", newName, buffer, file.size);
  return newName;
};
