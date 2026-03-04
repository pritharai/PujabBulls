import { useEffect, useState } from "react";
import { fetchPublishedBlogs } from "../services/publicBlogService";
import BlogCard from "../components/BlogCard";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadBlogs = async (page) => {
        const data = await fetchPublishedBlogs({
            page,
            limit: 6,
        });

        setBlogs(data.blogs);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        loadBlogs(1);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="py-20 bg-gray-50 text-center">
                <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
                    Insights & Resources
                </h1>
                <p className="max-w-2xl mx-auto text-gray-600">
                    Stay updated with the latest trends in ERP, CRM, and compliance.
                </p>
            </section>

            {/* Blog Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {blogs.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                No Blogs Yet
                            </h2>
                            <p className="text-gray-500">
                                We’re working on publishing insightful content. Stay tuned!
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
                    {blogs.length > 0 && (
                        <div className="mt-16 flex justify-center gap-2">
                            {[...Array(totalPages)].map((_, i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => loadBlogs(page)}
                                        className={`w-10 h-10 rounded-lg ${currentPage === page
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