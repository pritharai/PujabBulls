import SEO from "../components/SEO";
import BlogRenderer from "../components/BlogRenderer";
import RelatedSeoPages from "../components/RelatedSeoPages";

export default function GeneratedSeoPage({ page }) {
  if (!page) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <SEO
        title={page.title}
        description={page.description}
        keywords={page.keywords}
        canonical={page.canonical || page.path}
        ogImage={page.ogImage || page.coverImage?.url}
        prerenderHint={page.prerender ?? true}
        noindex={page.noindex ?? false}
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.heading,
          headline: page.heading,
          description: page.description,
          url: `https://www.punjabbulls.com${page.path}`,
          image: page.ogImage || page.coverImage?.url,
        }}
      />

      <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
        {page.heading}
      </h1>

      {page.excerpt ? (
        <p className="mb-6 text-base leading-7 text-gray-600 sm:text-lg">
          {page.excerpt}
        </p>
      ) : null}

      {page.coverImage?.url ? (
        <img
          src={page.coverImage.url}
          alt={page.coverImage.alt || page.heading}
          loading="lazy"
          className="mb-8 w-full rounded-lg"
        />
      ) : null}

      <BlogRenderer content={page.content} />
      <RelatedSeoPages currentPath={page.path} />
    </div>
  );
}
