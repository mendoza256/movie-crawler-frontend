import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function returnfirstLetter(string: string) {
  return string.charAt(0);
}

export function shortenMovieOverview(string: string, maxLength: number) {
  if (string.length > maxLength) {
    const shortened = string.slice(0, maxLength);
    return (
      shortened.slice(
        0,
        Math.min(shortened.length, shortened.lastIndexOf(" "))
      ) + "..."
    );
  }
  return string;
}
