import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalizes a phone number to the WhatsApp wa.me format.
 * Assumes Brazilian numbers (adds country code 55 if not present).
 * Input:  "(11) 98888-7777" or "11988887777"
 * Output: "5511988887777"
 */
export function normalizePhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) return digits;
  return `55${digits}`;
}
