import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const mapToString = (map) => {
  console.log("OBJECT: " + JSON.stringify(map, null, 2));
};
