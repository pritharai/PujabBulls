import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogBySlug } from "../services/publicBlogService";
import BlogRenderer from "../components/BlogRenderer";
import SEO from "../components/SEO";
import NotFound from "./NotFound";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBlogBySlug(slug);
        if (!data?.blog) {
          setStatus("not_found");
          return;
        }

        setBlog(data.blog);
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
    <div className="container mx-auto py-12 max-w-4xl">
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
      <h1 className="text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-600 mb-6">
        {blog.excerpt}
      </p>

      {blog.coverImage && (
        <img
          src={blog.coverImage.url}
          alt={blog.title}
          loading="lazy"
          className="w-full rounded-lg mb-8"
        />
      )}

      <BlogRenderer content={blog.content} />
    </div>
  );
}
