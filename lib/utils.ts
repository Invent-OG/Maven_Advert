import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStoragePath = (url: string) => {
  try {
    const parts = url.split("/");
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
};
