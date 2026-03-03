// src/components/Blog/BlogToolbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Sticky search bar + article count row below the hero
//
// Props:
//   value       — current search input string
//   onChange(v) — update input string
//   onSearch()  — submit search
//   totalPosts  — number to display in count badge

export default function BlogToolbar({ value, onChange, onSearch, totalPosts }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="toolbar">
      <div className="container">

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "0.6rem", flex: 1, maxWidth: 480 }}
        >
          <div className="search-bar" style={{ flex: 1 }}>
            <span className="search-bar-icon">🔍</span>
            <input
              placeholder="Search articles…"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </form>

        <span className="toolbar-count">
          <strong>{totalPosts}</strong> articles
        </span>

      </div>
    </div>
  );
}
