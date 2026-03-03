// src/components/Blog/BlogListing.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Public blog listing — hero, toolbar, featured card, grid, pagination
//
// Props:
//   onReadPost(slug) — navigate to single post

import { useState, useEffect, useCallback } from "react";

import BlogHero     from "./BlogHero";
import BlogToolbar  from "./BlogToolbar";
import FeaturedPost from "./FeaturedPost";
import PostCard     from "./PostCard";
import SkeletonCard from "./SkeletonCard";
import Pagination   from "./Pagination";
import { apiRequest }    from "../../config/api";
import { POSTS_PER_PAGE } from "../../config/constants";

export default function BlogListing({ onReadPost }) {
  const [posts,          setPosts]          = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [page,           setPage]           = useState(1);
  const [totalPages,     setTotalPages]     = useState(1);
  const [totalPosts,     setTotalPosts]     = useState(0);
  const [searchInput,    setSearchInput]    = useState("");
  const [appliedSearch,  setAppliedSearch]  = useState("");

  /* ── Fetch ── */
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page,
      limit: POSTS_PER_PAGE,
      status: "published",
      ...(appliedSearch ? { search: appliedSearch } : {}),
    });
    const data = await apiRequest(`/api/blogs?${params}`);
    if (data.success) {
      setPosts(data.blogs ?? []);
      setTotalPages(data.totalPages ?? 1);
      setTotalPosts(data.totalBlogs ?? 0);
    }
    setLoading(false);
  }, [page, appliedSearch]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  /* ── Handlers ── */
  const handleSearch = () => {
    setAppliedSearch(searchInput);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setAppliedSearch("");
    setPage(1);
  };

  const featuredPost = posts[0];
  const gridPosts    = posts.slice(1);

  /* ── Render ── */
  return (
    <>
      <BlogHero />

      <BlogToolbar
        value={searchInput}
        onChange={setSearchInput}
        onSearch={handleSearch}
        totalPosts={totalPosts}
      />

      <div className="blog-page">
        <div className="container">

          {/* Loading skeletons */}
          {loading && (
            <>
              <div
                className="skeleton"
                style={{ height: 320, borderRadius: "var(--radius-xl)", marginBottom: "2rem" }}
              />
              <div className="posts-grid">
                {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
              </div>
            </>
          )}

          {/* Empty state */}
          {!loading && posts.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <div className="empty-state-title">No articles found</div>
              <p className="empty-state-body">
                {appliedSearch
                  ? `No results for "${appliedSearch}". Try a different search term.`
                  : "No published articles yet. Check back soon."}
              </p>
              {appliedSearch && (
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: "1rem" }}
                  onClick={clearSearch}
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Posts */}
          {!loading && posts.length > 0 && (
            <>
              {/* Featured (first post) */}
              {featuredPost && (
                <FeaturedPost
                  post={featuredPost}
                  onClick={() => onReadPost(featuredPost.slug)}
                />
              )}

              {/* Grid (remaining posts) */}
              {gridPosts.length > 0 && (
                <>
                  <div className="section-label">More Articles</div>
                  <div className="posts-grid">
                    {gridPosts.map((post) => (
                      <PostCard
                        key={post._id}
                        post={post}
                        onClick={() => onReadPost(post.slug)}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Pagination */}
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </>
          )}

        </div>
      </div>
    </>
  );
}
