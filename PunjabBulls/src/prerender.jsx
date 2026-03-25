import { staticRouteMeta } from "./seo/routes";
import { DEFAULT_OG_IMAGE, SITE_NAME, toAbsoluteUrl } from "./seo/site";

function buildHead(route) {
  const canonicalUrl = toAbsoluteUrl(route.canonical);
  const ogImage = toAbsoluteUrl(route.ogImage || DEFAULT_OG_IMAGE);
  const elements = new Set([
    { type: "meta", props: { name: "description", content: route.description } },
    ...(route.keywords?.length
      ? [
          {
            type: "meta",
            props: { name: "keywords", content: route.keywords.join(", ") },
          },
        ]
      : []),
    {
      type: "meta",
      props: {
        name: "robots",
        content: route.noindex ? "noindex, follow" : "index, follow",
      },
    },
    { type: "link", props: { rel: "canonical", href: canonicalUrl } },
    {
      type: "link",
      props: { rel: "alternate", hrefLang: "en-IN", href: canonicalUrl },
    },
    { type: "meta", props: { property: "og:site_name", content: SITE_NAME } },
    { type: "meta", props: { property: "og:title", content: route.title } },
    {
      type: "meta",
      props: { property: "og:description", content: route.description },
    },
    { type: "meta", props: { property: "og:type", content: "website" } },
    { type: "meta", props: { property: "og:url", content: canonicalUrl } },
    { type: "meta", props: { property: "og:image", content: ogImage } },
    {
      type: "meta",
      props: { name: "twitter:card", content: "summary_large_image" },
    },
    { type: "meta", props: { name: "twitter:title", content: route.title } },
    {
      type: "meta",
      props: { name: "twitter:description", content: route.description },
    },
    { type: "meta", props: { name: "twitter:image", content: ogImage } },
    { type: "meta", props: { name: "prerendered-route", content: "true" } },
  ]);

  return {
    title: route.title,
    elements,
  };
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function loadHomepageBlogLinks() {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const projectRoot = path.resolve(__dirname, "..");
    const sitemapPath = path.join(projectRoot, "public", "sitemap.xml");
    const sitemap = await fs.readFile(sitemapPath, "utf8");
    const matches = Array.from(
      sitemap.matchAll(/<loc>https:\/\/www\.punjabbulls\.com\/blogs\/([^<]+)<\/loc>/g)
    );

    return matches.slice(0, 3).map((match) => {
      const slug = match[1];
      return {
        slug,
        title: titleFromSlug(slug),
      };
    });
  } catch {
    return [];
  }
}

export async function prerender({ url }) {
  const route = staticRouteMeta[url] || staticRouteMeta["/404"];
  const blogLinks = url === "/" ? await loadHomepageBlogLinks() : [];
  const homepageLinks =
    blogLinks.length > 0
      ? `<noscript><section><h2>Latest Blog Posts</h2>${blogLinks
          .map(
            (blog) =>
              `<article><a href="/blogs/${blog.slug}">${blog.title}</a></article>`
          )
          .join("")}</section></noscript>`
      : "";
  const html = `<div data-prerender-shell="true" aria-hidden="true"></div>${homepageLinks}`;

  return {
    html,
    head: buildHead(route),
  };
}
