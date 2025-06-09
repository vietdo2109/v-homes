import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toImageURL(imagePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/v-homes-47400.firebasestorage.app/o/${encodeURIComponent(
    imagePath
  )}?alt=media`;
}
