import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const uploadFile = async (file: File): Promise<string> => {
    const apiKey = "57e5c2617e80c2dd29dc924d41564574";
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) throw new Error("Upload failed");
    const data = await response.json();
    return data.data.url;
};