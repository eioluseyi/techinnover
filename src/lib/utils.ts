import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const defaultDateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

export function formatDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const newOptions = { ...defaultDateOptions, ...options };
  return new Intl.DateTimeFormat("en-GB", newOptions).format(date);
}

export function formatTime(
  time: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat("en-GB", options).format(time);
}
