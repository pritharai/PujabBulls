// src/components/Admin/AdminArticleList.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Data table of all articles with search, status filter, and pagination
//
// Props:
//   onEdit(post)      — open editor for a post
//   onDelete(post)    — trigger delete confirmation
//   onPreview(slug)   — open post in preview mode

import { useState, useEffect, useCallback } from "react";

import StatusBadge from "../UI/StatusBadge";
import Pagination  from "../UI/Pagination";
import { apiRequest }     from "../../config/api";
import { formatDateShort } from "../../config/utils";

export default function AdminArticleList({ onEdit, onDelete, onPreview }) {
  const [posts,          setPosts]          = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [page,           setPage]           = useState(1);
  const [totalPages,     setTotalPages]     = useState(1);
  const [totalPosts,     setTotalPosts]     = useState(0);
  const [searchInput,    setSearchInput]    = useState("");
  const [appliedSearch,  setAppliedSearch]  = useState("");
  const [statusFilter,   setStatusFilter]   = useState("");

  /* ── Fetch ── */
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page,
      limit: 10,
      ...(appliedSearch ? { search: appliedSearch } : {}),
      ...(statusFilter  ? { status: statusFilter  } : {}),
    });
    const data = await apiRequest(`/api/blogs?${params}`);
    if (data.success) {
      setPosts(data.blogs ?? []);
      setTotalPages(data.totalPages ?? 1);
      setTotalPosts(data.totalBlogs ?? 0);
    }
    setLoading(false);
  }, [page, appliedSearch, statusFilter]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedSearch(searchInput);
    setPage(1);
  };

  /* ── Render ── */
  return (
    <div className="table-card">

      {/* Toolbar */}
      <div className="table-card-header">
        <span className="table-card-title">
          {totalPosts} article{totalPosts !== 1 ? "s" : ""}
        </span>

        <div style={{ display: "flex", gap: "0.65rem", flex: 1, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
            <div className="search-bar" style={{ minWidth: 220 }}>
              <span className="search-bar-icon">🔍</span>
              <input
                placeholder="Search articles…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-outline btn-sm">Search</button>
          </form>

          <select
            className="form-select"
            style={{ width: "auto", minWidth: 140 }}
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table / States */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading articles…</p>
        </div>

      ) : posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📄</div>
          <div className="empty-state-title">No articles found</div>
          <p className="empty-state-body">Adjust your filters or create a new article.</p>
        </div>

      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>
                  <div className="td-primary">{post.title}</div>
                  {post.excerpt && (
                    <div style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginTop: "0.2rem",
                      maxWidth: 380,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {post.excerpt}
                    </div>
                  )}
                </td>
                <td>
                  <StatusBadge status={post.status} />
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {formatDateShort(post.createdAt)}
                </td>
                <td>
                  <span className="td-mono">{post.slug}</span>
                </td>
                <td>
                  <div className="td-actions">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => onPreview(post.slug)}
                    >
                      Preview
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => onEdit(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(post)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ padding: "0.75rem 1.25rem", borderTop: posts.length ? "1px solid var(--border)" : "none" }}>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

    </div>
  );
}
