export const FALLBACK_TIME_ZONE = "America/Phoenix";

export function isValidTimeZone(timeZone: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format();
    return true;
  } catch {
    return false;
  }
}

export function formatCurrentTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: isValidTimeZone(timeZone) ? timeZone : FALLBACK_TIME_ZONE,
  }).format(new Date());
}
