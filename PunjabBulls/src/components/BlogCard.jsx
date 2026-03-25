import { Link } from "react-router-dom";

export default function BlogCard({
  blog,
  isAdmin = false,
  onDelete,
  onGeneratePage,
}) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString(
    "en-IN",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <a href={`/blogs/${blog.slug}`} className="flex flex-col flex-grow">

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={blog.coverImage?.url}
            alt={blog.title}
            loading="lazy"
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

      </a>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex flex-wrap gap-3 border-t bg-gray-50/80 p-4">

          <Link
            to={`/admin/blogs/edit/${blog._id}`}
            className="inline-flex min-w-[110px] cursor-pointer items-center justify-center rounded-lg border border-[#1f803c] bg-[#1f803c] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#16632e]"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(blog._id)}
            className="inline-flex min-w-[110px] cursor-pointer items-center justify-center rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
          >
            Delete
          </button>

          <button
            onClick={() => onGeneratePage?.(blog)}
            className="inline-flex min-w-[130px] cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
          >
            Create Page
          </button>

        </div>
      )}

    </article>
  );
}
