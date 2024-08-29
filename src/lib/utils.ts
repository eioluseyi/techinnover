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

// Helper function to get MIME type from file extension for audio and image
function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    // Add more image types as needed
    case "mp3":
      return "audio/mpeg";
    case "wav":
      return "audio/wav";
    case "ogg":
      return "audio/ogg";
    case "m4a":
      return "audio/m4a";
    // Add more audio types as needed
    default:
      return "audio/mpeg"; // Default to mp3 if unknown
  }
}

export function formatTime(
  time: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat("en-GB", options).format(time);
}

export const getPseudoFile = (
  resourcePath: string,
  options?: { size?: number; type?: string; base_url?: string }
) => {
  const fileName = resourcePath?.split("/").pop() || "";
  const props: FilePropertyBag = {
    lastModified: new Date().getTime(),
    type: options?.type || getMimeType(fileName),
  };

  const file = fileName
    ? new File([new ArrayBuffer(options?.size || 0)], fileName, props)
    : null;

  if (!resourcePath) return file;
  // console.log(resourcePath, options?.base_url);

  const resourceUrl = new URL(resourcePath).href;

  // Set the webkitRelativePath to the URL path
  Object.defineProperty(file, "webkitRelativePath", {
    value: resourceUrl,
    writable: false,
  });

  return file;
};

export function getDateTimeValuesForPickers(date: Date): {
  dateValue: string;
  timeValue: string;
} {
  if (!(date instanceof Date)) {
    throw new TypeError("Expected a Date object");
  }

  // Format the date in YYYY-MM-DD
  const dateValue = date.toISOString().split("T")[0]; // Example: 2024-08-29

  // Format the time in HH:MM
  const timeValue = date.toTimeString().split(" ")[0].slice(0, 5); // Example: 14:30

  return {
    dateValue,
    timeValue,
  };
}

export function combineDateTimeToISOString(
  dateString: string,
  timeString: string
): string {
  // Validate and parse the input strings
  if (!/^(\d{4}-\d{2}-\d{2})$/.test(dateString)) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD");
  }

  if (!/^(\d{2}:\d{2})$/.test(timeString)) {
    throw new Error("Invalid time format. Expected HH:MM");
  }

  // Combine date and time into a single ISO string
  const [year, month, day] = dateString.split("-");
  const [hours, minutes] = timeString.split(":");
  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;

  // Create a new Date object from the ISO string and return the ISO string
  const date = new Date(isoString);
  return date.toISOString();
}

export const getFilePath = async (file: File | null) => {
  return new Promise((resolve: (value: string) => void, reject) => {
    if (!file) {
      resolve(""); // Return an empty string if no file
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(String(reader.result) as string); // Resolve with the data URL
    };

    reader.onerror = () => {
      reject(new Error("Error reading file")); // Reject on error
    };

    reader.readAsDataURL(file); // Start reading the file
  });
};
