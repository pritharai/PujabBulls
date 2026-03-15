import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sitemapRoutes } from "../src/seo/routes.js";
import { SITE_URL } from "../src/seo/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const envPath = path.join(projectRoot, ".env");
const sitemapPath = path.join(publicDir, "sitemap.xml");

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function readEnvFile() {
  try {
    const content = await fs.readFile(envPath, "utf8");
    const env = {};

    for (const line of content.split(/\r?\n/)) {
      if (!line || line.trim().startsWith("#") || !line.includes("=")) {
        continue;
      }

      const separatorIndex = line.indexOf("=");
      const key = line.slice(0, separatorIndex).trim();
      const rawValue = line.slice(separatorIndex + 1).trim();
      env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    }

    return env;
  } catch {
    return {};
  }
}

async function fetchPublishedBlogs() {
  const env = await readEnvFile();
  const apiBaseUrl =
    process.env.VITE_API_URL || env.VITE_API_URL || env.API_URL || "";

  if (!apiBaseUrl) {
    return [];
  }

  const blogs = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages) {
    const url = new URL("/api/blogs", apiBaseUrl);
    url.searchParams.set("page", String(currentPage));
    url.searchParams.set("limit", "100");
    url.searchParams.set("status", "published");

    try {
      const response = await fetch(url);

      if (!response.ok) {
        break;
      }

      const payload = await response.json();
      const pageBlogs = Array.isArray(payload.blogs) ? payload.blogs : [];
      blogs.push(...pageBlogs);

      totalPages = Number(payload.totalPages) || currentPage;
      currentPage += 1;
    } catch {
      break;
    }
  }

  return blogs;
}

function buildStaticEntry(route) {
  const lastmod = new Date().toISOString().split("T")[0];

  return {
    loc: `${SITE_URL}${route.path === "/" ? "/" : route.path}`,
    lastmod,
    changefreq: route.changefreq,
    priority: route.priority,
  };
}

function buildBlogEntry(blog) {
  if (!blog?.slug) {
    return null;
  }

  const lastmodSource = blog.updatedAt || blog.createdAt || new Date().toISOString();
  const lastmod = new Date(lastmodSource).toISOString().split("T")[0];

  return {
    loc: `${SITE_URL}/blogs/${blog.slug}`,
    lastmod,
    changefreq: "monthly",
    priority: "0.7",
  };
}

function renderUrl(entry) {
  return `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}

async function main() {
  const staticEntries = sitemapRoutes.map(buildStaticEntry);
  const blogEntries = (await fetchPublishedBlogs()).map(buildBlogEntry).filter(Boolean);
  const uniqueEntries = Array.from(
    new Map([...staticEntries, ...blogEntries].map((entry) => [entry.loc, entry])).values()
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries.map(renderUrl).join("\n")}
</urlset>
`;

  await fs.writeFile(sitemapPath, xml, "utf8");
}

main().catch((error) => {
  console.error("Failed to generate sitemap.xml", error);
  process.exitCode = 1;
});

