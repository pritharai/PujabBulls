import { generatedSeoPages } from "../seo/generatedPages";
import { staticRouteMeta } from "../seo/routes";

const RESERVED_PATHS = [
  "/privacy",
  "/admin/login",
  "/admin/blogs",
  "/admin/blogs/create",
  "/admin/upload-video",
  "/admin/manage-videos",
  "/admin/image-audit-logs",
];

export function slugifySeoPagePath(value = "") {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug ? `/${slug}` : "";
}

export function getSeoPagePathConflict(path) {
  if (!path) {
    return "Enter a valid slug to generate the page.";
  }

  if (RESERVED_PATHS.includes(path)) {
    return "This path is reserved by an existing route.";
  }

  if (staticRouteMeta[path]) {
    return "This path is already used by an existing frontend page.";
  }

  if (generatedSeoPages.some((page) => page.path === path)) {
    return "This path already exists in generated SEO pages.";
  }

  return "";
}

function stringifyForCode(value) {
  return JSON.stringify(value, null, 2);
}

export function normalizeKeywords(input = "") {
  const source = Array.isArray(input) ? input.join(",") : input;

  return source
    .split(/,|\r?\n/g)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item, index, array) => array.indexOf(item) === index);
}

export function buildSeoPageCode(blog, form) {
  const path = slugifySeoPagePath(form.slug);
  const keywords = normalizeKeywords(form.keywords);

  const entry = {
    path,
    heading: form.heading.trim(),
    title: form.title.trim(),
    description: form.description.trim(),
    excerpt: form.excerpt.trim(),
    keywords,
    canonical: path,
    prerender: true,
    sitemap: true,
    changefreq: form.changefreq,
    priority: form.priority,
    ogImage: blog.coverImage?.url || "",
    coverImage: blog.coverImage
      ? {
          url: blog.coverImage.url,
          alt: blog.title,
        }
      : null,
    showInMoreMenu: form.showInMoreMenu,
    showInFooter: form.showInFooter,
    showInRelatedSection: form.showInRelatedSection,
    navLabel: form.navLabel.trim(),
    order: Number(form.order || 99),
    content: blog.content,
  };

  return `{
  ${stringifyForCode(entry).slice(1, -1).trim()}
},`;
}
