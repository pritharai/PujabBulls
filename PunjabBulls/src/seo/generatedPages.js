export const generatedSeoPages = [
  // Paste generated SEO page entries here.
{
  "path": "/channels-tv",
  "heading": "TV CHANNELS",
  "title": "PunjabBulls Food Factory | PunjabBulls | TV Channel",
  "description": "PunjabBulls Food Factory, ERP solutions + Compliance Business",
  "excerpt": "PunjabBulls Food Factory, ERP solutions + Compliance Business",
  "keywords": [
    "punjabbulls food factory",
    "PunjabBulls",
    "ERP",
    "Microsoft Dynamics 365 Business Central",
    "TV",
    "Discovery",
    "Pogo",
    "PunjabBulls Food Factory"
  ],
  "canonical": "/channels-tv",
  "prerender": true,
  "sitemap": true,
  "changefreq": "yearly",
  "priority": "0.9",
  "ogImage": "https://res.cloudinary.com/first-cloudinary/image/upload/v1774099001/blog_images/vazx9fbmkqwrpdib6ybd.png",
  "coverImage": {
    "url": "https://res.cloudinary.com/first-cloudinary/image/upload/v1774099001/blog_images/vazx9fbmkqwrpdib6ybd.png",
    "alt": "PunjabBulls Food Factory"
  },
  "showInMoreMenu": true,
  "showInFooter": true,
  "showInRelatedSection": true,
  "navLabel": "TV Channels",
  "order": 2,
  "content": {
    "time": 1774099104084,
    "blocks": [
      {
        "id": "awzlrJ3wDo",
        "type": "header",
        "data": {
          "text": "<b>Food Factory</b>",
          "level": 1
        }
      },
      {
        "id": "Wpq85Tx9FO",
        "type": "paragraph",
        "data": {
          "text": "Best Food Factory"
        }
      },
      {
        "id": "0nXm0bVU-h",
        "type": "table",
        "data": {
          "withHeadings": false,
          "stretched": false,
          "content": [
            [
              "<b>Channels</b>",
              "Stuff"
            ],
            [
              "Discovery",
              "Yes"
            ],
            [
              "National Geographic channel",
              "Yes"
            ],
            [
              "History TV18",
              "Yes"
            ]
          ]
        }
      },
      {
        "id": "jHvc_eBtG-",
        "type": "quote",
        "data": {
          "text": "Sabko Aati nahi Meri jaati nahi",
          "caption": "Tiger Shroff",
          "alignment": "left"
        }
      },
      {
        "id": "XXiDKU8qpq",
        "type": "code",
        "data": {
          "code": "<>Goodbye world</>"
        }
      }
    ],
    "version": "2.31.3"
  }
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
