import { format, parseISO } from "date-fns";

/**
 * Format a date string to a human-readable format like "Jan 2023".
 * Returns "Present" for current dates.
 */
export function formatDate(dateStr) {
  if (!dateStr || dateStr.toLowerCase() === "present") {
    return "Present";
  }
  try {
    const date = parseISO(dateStr);
    return format(date, "MMM yyyy");
  } catch {
    return dateStr;
  }
}
