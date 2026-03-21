export const generatedSeoPages = [
  // Paste generated SEO page entries here.
  {
    path: "/this-is-going-to-be-smt",
    heading: "This is going to be a test sample Test blog",
    title: "This is going to be a test sample Test blog | PunjabBulls",
    description: "Holy Moli lori poli",
    excerpt: "Holy Moli lori poli",
    keywords: [
      "This is going to be a test sample Test blog",
      "this is going to be a test sample test blog",
      "PunjabBulls",
      "ERP",
      "Microsoft Dynamics 365 Business Central",
    ],
    canonical: "/this-is-going-to-be-smt",
    prerender: true,
    sitemap: true,
    changefreq: "weekly",
    priority: "0.9",
    ogImage:
      "https://res.cloudinary.com/first-cloudinary/image/upload/v1773752389/blog_images/wh05j8dn3xx7ubq9lapi.png",
    coverImage: {
      url: "https://res.cloudinary.com/first-cloudinary/image/upload/v1773752389/blog_images/wh05j8dn3xx7ubq9lapi.png",
      alt: "This is going to be a test sample Test blog",
    },
    showInMoreMenu: true,
    showInFooter: true,
    showInRelatedSection: true,
    navLabel: "Test page 1",
    order: 99,
    content: {
      time: 1773752472773,
      blocks: [
        {
          id: "cdofnObmJU",
          type: "code",
          data: {
            code: "<>Hello World</>",
          },
        },
        {
          id: "kXU9GuabFU",
          type: "header",
          data: {
            text: "<b><i>Kinda Ate</i></b>",
            level: 1,
          },
        },
        {
          id: "SQzyFH-dZc",
          type: "image",
          data: {
            caption: "",
            withBorder: false,
            withBackground: false,
            stretched: false,
            file: {
              url: "https://res.cloudinary.com/first-cloudinary/image/upload/v1773752483/blog_images/ofrxjtecl2ryueruvcpc.png",
              public_id: "blog_images/ofrxjtecl2ryueruvcpc",
            },
          },
        },
      ],
      version: "2.31.3",
    },
  },

  
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
