const STORAGE_KEY = "contact-email-alias";

export const FALLBACK_CONTACT_EMAIL = "contact@zaydkrunz.com";

let emailPromise: Promise<string> | undefined;

async function loadContactEmail(): Promise<string> {
  try {
    const savedAlias = window.localStorage.getItem(STORAGE_KEY);
    if (savedAlias && /^[a-z0-9]{16}$/.test(savedAlias)) {
      return `${savedAlias}@zaydkrunz.com`;
    }
  } catch {
    // A browser can block storage while still allowing the email link to work.
  }

  const { customAlphabet } = await import("nanoid");
  const generateAlias = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 16);
  const alias = generateAlias();

  try {
    window.localStorage.setItem(STORAGE_KEY, alias);
  } catch {
    // Keep the generated address for this visit when persistence is unavailable.
  }

  return `${alias}@zaydkrunz.com`;
}

export function getContactEmail(): Promise<string> {
  // Share initialization across remounts, including React Strict Mode.
  emailPromise ??= loadContactEmail();
  return emailPromise;
}
