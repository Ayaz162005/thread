import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
