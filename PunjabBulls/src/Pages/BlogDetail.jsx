import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchBlogBySlug,
  fetchPublishedBlogs,
} from "../services/publicBlogService";
import BlogRenderer from "../components/BlogRenderer";
import SEO from "../components/SEO";
import NotFound from "./NotFound";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const load = async () => {
      try {
        const [data, related] = await Promise.all([
          fetchBlogBySlug(slug),
          fetchPublishedBlogs({ page: 1, limit: 6 }),
        ]);

        if (!data?.blog) {
          setStatus("not_found");
          return;
        }

        setBlog(data.blog);
        setRelatedBlogs(
          (related?.blogs || [])
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
        );
        setStatus("ready");
      } catch {
        setStatus("not_found");
      }
    };
    load();
  }, [slug]);

  if (status === "loading") return <div className="py-12 text-center">Loading...</div>;
  if (status === "not_found") return <NotFound />;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <SEO
        title={`${blog.title} | PunjabBulls Blog`}
        description={blog.excerpt || "Read this PunjabBulls blog article."}
        canonical={`/blogs/${slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.excerpt || "Read this PunjabBulls blog article.",
          url: `https://www.punjabbulls.com/blogs/${slug}`,
          mainEntityOfPage: `https://www.punjabbulls.com/blogs/${slug}`,
          image: blog.coverImage?.url,
          datePublished: blog.createdAt,
          dateModified: blog.updatedAt || blog.createdAt,
          author: {
            "@type": "Organization",
            name: "PunjabBulls Technology Pvt. Ltd.",
          },
          publisher: {
            "@type": "Organization",
            name: "PunjabBulls Technology Pvt. Ltd.",
          },
        }}
      />
      <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
        {blog.title}
      </h1>

      <p className="mb-6 text-base leading-7 text-gray-600 sm:text-lg">
        {blog.excerpt}
      </p>

      {blog.coverImage && (
        <img
          src={blog.coverImage.url}
          alt={blog.title}
          loading="lazy"
          className="mb-8 w-full rounded-lg"
        />
      )}

      <BlogRenderer content={blog.content} />

      {relatedBlogs.length > 0 ? (
        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold mb-4">Related Posts</h2>
          <ul className="space-y-3">
            {relatedBlogs.map((item) => (
              <li key={item._id || item.slug}>
                <a href={`/blogs/${item.slug}`} className="text-blue-600 underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
