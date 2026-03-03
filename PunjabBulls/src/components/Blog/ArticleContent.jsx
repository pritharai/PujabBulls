// src/components/Blog/ArticleContent.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Renders EditorJS JSON content into styled HTML
// Falls back to raw HTML string if content is a string
// Props: content (EditorJS object | HTML string | null)

const HEADER_CLASS = {
  1: "ejs-h1",
  2: "ejs-h2",
  3: "ejs-h3",
  4: "ejs-h3",
  5: "ejs-h3",
  6: "ejs-h3",
};

export default function ArticleContent({ content }) {
  if (!content) return null;

  // Plain HTML string fallback
  if (typeof content === "string") {
    return (
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const blocks = content?.blocks;
  if (!blocks?.length) {
    return <p style={{ color: "var(--text-muted)" }}>No content available.</p>;
  }

  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        switch (block.type) {

          case "header":
            return (
              <div
                key={i}
                className={HEADER_CLASS[block.data.level] ?? "ejs-h2"}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case "paragraph":
            return (
              <p
                key={i}
                className="ejs-p"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case "list": {
            const Tag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              <Tag key={i} className="ejs-ul">
                {block.data.items.map((item, j) => {
                  const text = typeof item === "string" ? item : item?.content ?? "";
                  return (
                    <li key={j} dangerouslySetInnerHTML={{ __html: text }} />
                  );
                })}
              </Tag>
            );
          }

          case "quote":
            return (
              <blockquote key={i} className="ejs-quote">
                <span dangerouslySetInnerHTML={{ __html: block.data.text }} />
                {block.data.caption && <cite>{block.data.caption}</cite>}
              </blockquote>
            );

          case "warning":
            return (
              <div key={i} className="ejs-warning">
                {block.data.title && (
                  <div className="ejs-warning-title">⚠ {block.data.title}</div>
                )}
                <div
                  className="ejs-warning-body"
                  dangerouslySetInnerHTML={{ __html: block.data.message }}
                />
              </div>
            );

          case "delimiter":
            return <div key={i} className="ejs-delimiter">· · ·</div>;

          default:
            return null;
        }
      })}
    </div>
  );
}
