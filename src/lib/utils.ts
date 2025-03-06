import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TimeAgo({ date }: { date: number }) {
  const time = Date.now() - date;
  const seconds = time / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${Math.floor(minutes)}m ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)}h ago`;
  } else {
    return `${Math.floor(days)}d ago`;
  }
}
