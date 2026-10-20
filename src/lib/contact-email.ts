const STORAGE_KEY = "contact-dish-alias";

export const FALLBACK_CONTACT_EMAIL = "contact@zaydkrunz.com";

let emailPromise: Promise<string> | undefined;

async function loadContactEmail(): Promise<string> {
  try {
    const savedAlias = window.localStorage.getItem(STORAGE_KEY);
    if (
      savedAlias &&
      savedAlias.length <= 64 &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(savedAlias)
    ) {
      return `${savedAlias}@zaydkrunz.com`;
    }
  } catch {
    // A browser can block storage while still allowing the email link to work.
  }

  const { faker } = await import("@faker-js/faker/locale/en");
  const alias = faker.food
    .dish()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 64)
    .replace(/^-+|-+$/g, "");

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
