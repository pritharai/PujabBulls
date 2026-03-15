import { useEffect, useState } from "react";
import { fetchPublishedBlogs } from "../services/publicBlogService";
import BlogCard from "../components/BlogCard";
import SEO from "../components/SEO";
import { staticRouteMeta } from "../seo/routes";

export default function Blogs() {
    const meta = staticRouteMeta["/blogs"];
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const loadBlogs = async (page, searchQuery = "") => {
        setLoading(true);

        const data = await fetchPublishedBlogs({
            page,
            limit: 6,
            search: searchQuery
        });

        setBlogs(data.blogs);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);

        setLoading(false);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* debounce search */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    /* load blogs when search changes */
    useEffect(() => {
        loadBlogs(1, debouncedSearch);
    }, [debouncedSearch]);

    /* initial load */
    useEffect(() => {
        loadBlogs(1);
    }, []);

    return (
        <>
            <SEO
                title={meta.title}
                description={meta.description}
                canonical={meta.canonical}
                prerenderHint={meta.prerender}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    name: "PunjabBulls Blog",
                    description: meta.description,
                    url: "https://www.punjabbulls.com/blogs",
                }}
            />
            {/* Hero Section */}
            <section className="py-20 bg-gray-50 text-center">
                
                <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
                    Insights & Resources
                </h1>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Stay updated with the latest trends in ERP, CRM, and compliance.
                </p>

                {/* Search Bar */}
                <div className="mt-8 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f803c]"
                    />
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">

                    {loading ? (
                        <div className="text-center py-20 text-gray-500">
                            Loading blogs...
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                No Blogs Found
                            </h2>
                            <p className="text-gray-500">
                                Try searching for something else.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && blogs.length > 0 && (
                        <div className="mt-16 flex justify-center gap-2">
                            {[...Array(totalPages)].map((_, i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => loadBlogs(page, debouncedSearch)}
                                        className={`w-10 h-10 rounded-lg ${
                                            currentPage === page
                                                ? "bg-[#1f803c] text-white"
                                                : "border border-gray-200 hover:bg-gray-100"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                </div>
            </section>
        </>
    );
}
