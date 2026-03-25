export const generatedSeoPages = [
  // Paste generated SEO page entries here.

];

function sortPages(pages) {
  return [...pages].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export const generatedRouteMeta = Object.fromEntries(
  generatedSeoPages.map((page) => [
    page.path,
    {
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      canonical: page.canonical || page.path,
      prerender: page.prerender ?? true,
      sitemap: page.sitemap ?? true,
      changefreq: page.changefreq || "monthly",
      priority: page.priority || "0.7",
      noindex: page.noindex ?? false,
      ogImage: page.ogImage || page.coverImage?.url,
    },
  ]),
);

export const moreMenuSeoPages = sortPages(
  generatedSeoPages.filter((page) => page.showInMoreMenu),
);

export const footerSeoPages = sortPages(
  generatedSeoPages.filter((page) => page.showInFooter),
);

export const relatedSeoPages = sortPages(
  generatedSeoPages.filter((page) => page.showInRelatedSection),
);

export function findGeneratedSeoPage(pathname) {
  return generatedSeoPages.find((page) => page.path === pathname) || null;
}
