import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../../services/blogService";
import BlogCard from "../../components/BlogCard";
import { Link } from "react-router-dom";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 9;

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);

      const data = await getBlogs({
        page,
        limit,
      });

      setBlogs(data.blogs);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    await deleteBlog(id);

    // If deleting last item on page, move back a page
    if (blogs.length === 1 && currentPage > 1) {
      fetchBlogs(currentPage - 1);
    } else {
      fetchBlogs(currentPage);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <h1 className="text-3xl font-bold">
          Manage Blogs
        </h1>

        <Link
          to="/admin/blogs/create"
          className="inline-flex items-center justify-center rounded-lg px-5 py-2 bg-[#1f803c] text-white font-semibold shadow-sm hover:bg-[#16632e] transition"
        >
          + Create Blog
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">
            No Blogs Created Yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start by creating your first blog post.
          </p>
          <Link
            to="/admin/blogs/create"
            className="bg-[#1f803c] text-white px-5 py-2 rounded"
          >
            Create Blog
          </Link>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                isAdmin={true}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              {/* Prev */}
              <button
                disabled={currentPage === 1}
                onClick={() => fetchBlogs(currentPage - 1)}
                className={`w-10 h-10 rounded-lg border ${currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                  }`}
              >
                ‹
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => fetchBlogs(page)}
                    className={`w-10 h-10 rounded-lg ${currentPage === page
                        ? "bg-[#1f803c] text-white"
                        : "border hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => fetchBlogs(currentPage + 1)}
                className={`w-10 h-10 rounded-lg border ${currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                  }`}
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}