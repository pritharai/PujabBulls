// // src/components/Blog/SinglePost.jsx
// // ─────────────────────────────────────────────────────────────────────────────
// // Full article view — cover, header, meta, EditorJS body
// //
// // Props:
// //   slug     — post URL slug
// //   onBack() — navigate back to listing

// import { useState, useEffect } from "react";

// import ArticleContent from "./ArticleContent";
// import AuthorChip     from "./AuthorChip";
// import StatusBadge    from "./StatusBadge";
// import { apiRequest }   from "../../config/api";
// import { BLOG_CATEGORY } from "../../config/constants";
// import { formatDate }   from "../../config/utils";

// export default function SinglePost({ slug, onBack }) {
//   const [post,    setPost]    = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     apiRequest(`/api/blogs/${slug}`).then((data) => {
//       setPost(data.blog ?? null);
//       setLoading(false);
//     });
//   }, [slug]);

//   /* Loading */
//   if (loading) {
//     return (
//       <div className="post-page">
//         <div className="loading-state">
//           <div className="spinner" />
//           <p>Loading article…</p>
//         </div>
//       </div>
//     );
//   }

//   /* Not found */
//   if (!post) {
//     return (
//       <div className="post-page">
//         <button className="post-back" onClick={onBack}>← Back to Blog</button>
//         <div className="empty-state">
//           <div className="empty-state-icon">🔍</div>
//           <div className="empty-state-title">Article not found</div>
//           <p className="empty-state-body">
//             This article may have been removed or the link is incorrect.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* Article */
//   return (
//     <article className="post-page">
//       <button className="post-back" onClick={onBack}>← Back to Blog</button>

//       {/* Cover image */}
//       <div className="post-cover">
//         {post.coverImage?.url
//           ? <img src={post.coverImage.url} alt={post.title} />
//           : "☸"}
//       </div>

//       {/* Header */}
//       <header className="post-header">
//         <div className="post-header-tags">
//           <span className="badge badge-primary">{BLOG_CATEGORY}</span>
//         </div>

//         <h1 className="post-title">{post.title}</h1>

//         <div className="post-meta">
//           <AuthorChip />
//           <span className="post-meta-sep">·</span>
//           <span className="post-meta-date">{formatDate(post.createdAt)}</span>
//           {post.status === "draft" && (
//             <>
//               <span className="post-meta-sep">·</span>
//               <StatusBadge status="draft" />
//             </>
//           )}
//         </div>
//       </header>

//       {/* Article body */}
//       <ArticleContent content={post.content} />
//     </article>
//   );
// }
