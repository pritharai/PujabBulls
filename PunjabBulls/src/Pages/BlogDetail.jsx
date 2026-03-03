import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogBySlug } from "../services/publicBlogService";
import BlogRenderer from "../components/BlogRenderer";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchBlogBySlug(slug);
      setBlog(data.blog);
      console.log(data.blog)
    };
    load();
  }, [slug]);

  if (!blog) return <div className="py-12 text-center">Loading...</div>;

  return (
    <div className="container mx-auto py-12 max-w-4xl">
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
          className="w-full rounded-lg mb-8"
        />
      )}

      <BlogRenderer content={blog.content} />
    </div>
  );
}