import { useEffect, useState } from "react";
import { fetchPublishedBlogs } from "../services/publicBlogService";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPublishedBlogs({ page: 1, limit: 10 });
      setBlogs(data.blogs);
    };
    load();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog.slug}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {blog.coverImage && (
              <img
                src={blog.coverImage.url}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}