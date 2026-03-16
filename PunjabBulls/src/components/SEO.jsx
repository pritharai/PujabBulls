import { Helmet } from "react-helmet-async";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
} from "../seo/site";

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  schema,
  noindex = false,
  prerenderHint = false,
}) {
  const canonicalUrl = toAbsoluteUrl(canonical);
  const imageUrl = toAbsoluteUrl(ogImage);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords.join(", ")} /> : null}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-IN" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {prerenderHint ? (
        <meta name="prerendered-route" content="true" />
      ) : null}

      {schema ? (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      ) : null}

      <meta property="og:locale" content="en_IN" />
      <meta property="og:image:alt" content={title} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="publisher" content={SITE_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#1f7f3c" />
      <meta name="twitter:site" content="@PunjabBulls" />
      <meta property="article:publisher" content={SITE_URL} />
    </Helmet>
  );
}
