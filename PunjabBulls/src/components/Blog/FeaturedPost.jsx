// // src/components/Blog/FeaturedPost.jsx
// // ─────────────────────────────────────────────────────────────────────────────
// // The large hero card shown as the first post in the blog listing
// //
// // Props:
// //   post      — blog post object
// //   onClick   — called when the card is clicked

// import AuthorChip from "../UI/AuthorChip";
// import { BLOG_CATEGORY } from "../../config/constants";
// import { formatDateShort } from "../../config/utils";

// export default function FeaturedPost({ post, onClick }) {
//   return (
//     <div className="featured-post" onClick={onClick}>

//       {/* Image */}
//       <div className="featured-img">
//         {post.coverImage?.url
//           ? <img src={post.coverImage.url} alt={post.title} />
//           : <div className="featured-img-placeholder">☸</div>}
//       </div>

//       {/* Content */}
//       <div className="featured-body">
//         <div className="featured-meta">
//           <span className="badge badge-primary">{BLOG_CATEGORY}</span>
//           <span className="featured-meta-sep">·</span>
//           <span className="featured-meta-date">{formatDateShort(post.createdAt)}</span>
//         </div>

//         <div className="featured-title">{post.title}</div>

//         {post.excerpt && (
//           <p className="featured-excerpt">{post.excerpt}</p>
//         )}

//         <div className="featured-footer">
//           <AuthorChip date={formatDateShort(post.createdAt)} />
//           <span className="read-more-link">Read article →</span>
//         </div>
//       </div>

//     </div>
//   );
// }
