import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and combines Tailwind CSS classes.
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts.
 * @param inputs - The Tailwind CSS classes to merge
 * @returns The merged Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
