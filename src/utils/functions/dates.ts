export function getDate(dateString: string) {
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Madrid",
  }).format(date);

  return formattedDate;
}

function formatTimeDigit(number: number) {
  return number.toString().padStart(2, "0");
}

export function getTime(dateString: string) {
  const date = new Date(dateString);

  const hours = formatTimeDigit(date.getHours());
  const minutes = formatTimeDigit(date.getMinutes());

  return `${hours}:${minutes}`;
}
