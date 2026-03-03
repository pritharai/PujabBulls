import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../../services/blogService";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs({ page: 1, limit: 20 });
      setBlogs(data.blogs);
    } catch (err) {
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">All Blogs</h1>

      {blogs.length === 0 && <p>No blogs found.</p>}

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-medium">{blog.title}</h2>
              <p className="text-sm text-gray-500">
                Status: {blog.status}
              </p>
            </div>

            <button
              onClick={() => handleDelete(blog._id)}
              className="bg-red-600 text-white px-3 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}