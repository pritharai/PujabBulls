// src/components/Blog/PostCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Used in both the public blog grid and the admin card view
//
// Props:
//   post        — blog post object
//   onClick     — called when the card is clicked
//   showAdmin   — if true, shows Edit/Delete buttons instead of Read arrow
//   onEdit(post)   — admin only
//   onDelete(post) — admin only

import AuthorChip  from "./AuthorChip";
import StatusBadge from "./StatusBadge";
import { BLOG_CATEGORY } from "../../config/constants";
import { formatDateShort } from "../../config/utils";

export default function PostCard({
  post,
  onClick,
  showAdmin = false,
  onEdit,
  onDelete,
}) {
  return (
    <article className="post-card" onClick={onClick}>

      {/* Thumbnail */}
      <div className="card-thumb">
        {post.coverImage?.url
          ? <img src={post.coverImage.url} alt={post.title} />
          : <div className="card-thumb-placeholder">☸</div>}

        {showAdmin && (
          <div className="card-thumb-badge">
            <StatusBadge status={post.status} />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-category">{BLOG_CATEGORY}</div>
        <div className="card-title">{post.title}</div>
        {post.excerpt && <p className="card-excerpt">{post.excerpt}</p>}

        <div className="card-footer">
          <AuthorChip date={formatDateShort(post.createdAt)} />

          {showAdmin ? (
            <div
              className="card-footer-actions"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="btn btn-ghost btn-sm"
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
          ) : (
            <span className="read-more-link">Read →</span>
          )}
        </div>
      </div>

    </article>
  );
}
