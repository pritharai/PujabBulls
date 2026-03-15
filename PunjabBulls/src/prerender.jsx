import { staticRouteMeta } from "./seo/routes";
import { DEFAULT_OG_IMAGE, SITE_NAME, toAbsoluteUrl } from "./seo/site";

function buildHead(route) {
  const canonicalUrl = toAbsoluteUrl(route.canonical);
  const ogImage = toAbsoluteUrl(route.ogImage || DEFAULT_OG_IMAGE);
  const elements = new Set([
    { type: "meta", props: { name: "description", content: route.description } },
    {
      type: "meta",
      props: {
        name: "robots",
        content: route.noindex ? "noindex, follow" : "index, follow",
      },
    },
    { type: "link", props: { rel: "canonical", href: canonicalUrl } },
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

export async function prerender({ url }) {
  const route = staticRouteMeta[url] || staticRouteMeta["/404"];
  const html = `
    <main data-prerender-shell="true">
      <section>
        <h1>${route.title}</h1>
        <p>${route.description}</p>
      </section>
    </main>
  `;

  return {
    html,
    head: buildHead(route),
  };
}
