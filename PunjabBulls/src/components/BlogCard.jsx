import { Link } from "react-router-dom";

export default function BlogCard({
  blog,
  isAdmin = false,
  onDelete,
}) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString(
    "en-IN",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition duration-300">

      <Link to={`/blogs/${blog.slug}`} className="flex flex-col flex-grow">

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={blog.coverImage?.url}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/20"></div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">

          <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>Punjabbulls</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#1f803c] transition-colors">
            {blog.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-6">
            {blog.excerpt}
          </p>

          <span className="inline-flex items-center text-[#1f803c] font-semibold text-sm hover:gap-2 transition-all mt-auto">
            Read More →
          </span>

        </div>

      </Link>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex gap-2 p-4 border-t">

          <Link
            to={`/admin/blogs/edit/${blog._id}`}
            className="text-sm bg-[#1f803c] text-white px-3 py-1 rounded"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(blog._id)}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </div>
      )}

    </article>
  );
}