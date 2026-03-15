export const SITE_URL = "https://www.punjabbulls.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const SITE_NAME = "PunjabBulls Technology Pvt. Ltd.";

export function toAbsoluteUrl(path = "/") {
  if (!path) {
    return SITE_URL;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

