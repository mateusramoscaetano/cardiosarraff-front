export function convertDate(dateString: string | undefined) {
  if (!dateString) return "";

  // Check if the date is in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    // Split the date string directly without creating a Date object first
    const [year, month, day] = dateString.split("-").map(Number);
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  }

  // For other date formats, use the original method
  try {
    const date = new Date(dateString);

    // Check if date is invalid
    if (isNaN(date.getTime())) {
      return "";
    }

    // Get the day, month, and year from the date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
    const year = date.getFullYear();

    // Format the date components with leading zeros (if necessary)
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    // Return the formatted date string
    return `${formattedDay}/${formattedMonth}/${year}`;
  } catch (error) {
    console.error("Error converting date:", error);
    return "";
  }
}
