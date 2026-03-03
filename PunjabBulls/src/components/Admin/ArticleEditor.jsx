// src/components/Admin/ArticleEditor.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Create / Edit form for blog articles — with real EditorJS visual editor
//
//
// Props:
//   article        — existing post object (null = new article)
//   onSaved(post)  — called after successful save with the saved post
//   onCancel()     — called when user clicks Discard

import { useState, useEffect, useRef, useCallback } from "react";
import { apiRequest } from "../../config/api";

// ─────────────────────────────────────────────────────────────────────────────
// EditorJS CSS — injected once, scoped under .editorjs-wrap
// Overrides EditorJS defaults to match the VastuGyan design system
// ─────────────────────────────────────────────────────────────────────────────
const EDITOR_CSS = `
/* ── Wrapper ── */
.editorjs-wrap {
  min-height: 420px;
  padding: 1.25rem 1rem 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.96rem;
  line-height: 1.8;
  color: var(--text);
  position: relative;
}

/* ── CodeX Editor core resets ── */
.editorjs-wrap .codex-editor {
  position: relative;
}
.editorjs-wrap .codex-editor__redactor {
  padding-bottom: 60px !important;
}

/* ── Block base ── */
.editorjs-wrap .ce-block {
  margin: 0;
  padding: 0;
}
.editorjs-wrap .ce-block__content {
  max-width: 100%;
  margin: 0;
  padding: 0.12rem 0;
}

/* ── Paragraph ── */
.editorjs-wrap .ce-paragraph {
  font-size: 0.96rem;
  line-height: 1.82;
  color: var(--text-mid);
  padding: 0.18rem 0;
  outline: none;
}
.editorjs-wrap .ce-paragraph[data-placeholder]::before {
  color: var(--text-placeholder);
  font-weight: 400;
}

/* ── Headers ── */
.editorjs-wrap .ce-header {
  font-weight: 800;
  color: var(--text);
  outline: none;
  padding: 0.2rem 0 0.1rem;
  letter-spacing: -0.3px;
  padding-left: 1rem;
  border-left: 3px solid var(--primary);
  margin: 1.5rem 0 0.5rem;
  line-height: 1.3;
}
.editorjs-wrap .ce-header[data-level="1"] { font-size: 1.6rem; letter-spacing: -0.6px; }
.editorjs-wrap .ce-header[data-level="2"] { font-size: 1.28rem; }
.editorjs-wrap .ce-header[data-level="3"] { font-size: 1.06rem; border-left: none; padding-left: 0; }
.editorjs-wrap .ce-header[data-placeholder]::before { color: var(--text-placeholder); font-weight: 700; }

/* ── List ── */
.editorjs-wrap .cdx-list {
  padding-left: 1.5rem;
  margin: 0.25rem 0;
  color: var(--text-mid);
  font-size: 0.96rem;
  line-height: 1.75;
}
.editorjs-wrap .cdx-list__item { margin-bottom: 0.3rem; padding: 0; outline: none; }
.editorjs-wrap .cdx-list-settings { gap: 4px; }

/* ── Quote ── */
.editorjs-wrap .cdx-quote {
  background: var(--primary-subtle);
  border-left: 3px solid var(--primary);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin: 0.5rem 0;
  padding: 0.9rem 1.4rem;
}
.editorjs-wrap .cdx-quote__text {
  font-style: italic;
  color: var(--text-mid);
  font-size: 0.97rem;
  line-height: 1.7;
  outline: none;
  min-height: 36px;
}
.editorjs-wrap .cdx-quote__caption {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.4rem;
  outline: none;
}
.editorjs-wrap .cdx-quote__caption::before { content: "— "; }

/* ── Warning ── */
.editorjs-wrap .cdx-warning {
  background: var(--amber-bg);
  border: 1px solid var(--amber-border);
  border-radius: var(--radius-md);
  padding: 0.85rem 1.1rem;
  margin: 0.4rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.editorjs-wrap .cdx-warning__icon { display: none; }
.editorjs-wrap .cdx-warning__title {
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--amber);
  outline: none;
}
.editorjs-wrap .cdx-warning__message {
  font-size: 0.875rem;
  color: var(--text-mid);
  outline: none;
}

/* ── Delimiter ── */
.editorjs-wrap .ce-delimiter {
  text-align: center;
  color: var(--primary);
  letter-spacing: 1rem;
  font-size: 0.9rem;
  opacity: 0.45;
  padding: 0.5rem 0;
  line-height: 1;
}
.editorjs-wrap .ce-delimiter::before { content: "· · ·"; }

/* ── Inline code ── */
.editorjs-wrap .ce-inline-code {
  background: var(--primary-light);
  color: var(--primary-dark);
  border-radius: 3px;
  padding: 1px 5px;
  font-family: 'Courier New', monospace;
  font-size: 0.88em;
}

/* ── Toolbar & plus button ── */
.editorjs-wrap .ce-toolbar__plus {
  color: var(--primary);
  background: var(--primary-light);
  border-radius: var(--radius);
  width: 28px; height: 28px;
  transition: background 0.15s;
}
.editorjs-wrap .ce-toolbar__plus:hover { background: var(--primary-mid); }

.editorjs-wrap .ce-toolbar__settings-btn {
  color: var(--text-muted);
  border-radius: var(--radius);
  width: 28px; height: 28px;
}
.editorjs-wrap .ce-toolbar__settings-btn:hover {
  background: var(--bg-muted);
  color: var(--text);
}

/* ── Toolbox (block picker) ── */
.editorjs-wrap .ce-toolbox {
  background: var(--bg-white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 0.3rem;
}
.editorjs-wrap .ce-toolbox__button {
  border-radius: var(--radius);
  color: var(--text-mid);
  transition: background 0.12s, color 0.12s;
}
.editorjs-wrap .ce-toolbox__button:hover,
.editorjs-wrap .ce-toolbox__button--active {
  background: var(--primary-light);
  color: var(--primary);
}

/* ── Block settings panel ── */
.editorjs-wrap .ce-settings {
  background: var(--bg-white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 0.3rem;
}
.editorjs-wrap .ce-settings__button,
.editorjs-wrap .cdx-settings-button {
  border-radius: var(--radius);
  color: var(--text-soft);
}
.editorjs-wrap .ce-settings__button:hover,
.editorjs-wrap .cdx-settings-button:hover {
  background: var(--primary-light);
  color: var(--primary);
}

/* ── Inline toolbar ── */
.editorjs-wrap .ce-inline-toolbar {
  background: var(--bg-dark);
  border: 1px solid var(--dk-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
.editorjs-wrap .ce-inline-tool,
.editorjs-wrap .ce-inline-toolbar__dropdown {
  color: var(--dk-text-soft);
  border-radius: var(--radius-sm);
}
.editorjs-wrap .ce-inline-tool:hover,
.editorjs-wrap .ce-inline-toolbar__dropdown:hover {
  background: rgba(255,255,255,0.1);
  color: var(--dk-text);
}
.editorjs-wrap .ce-inline-tool--active { color: var(--dk-text-mid) !important; }
.editorjs-wrap .ce-inline-toolbar__toggler-and-button-wrapper { padding: 0 4px; }

/* ── Conversion toolbar ── */
.editorjs-wrap .conversion-toolbar {
  background: var(--bg-white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
.editorjs-wrap .conversion-toolbar__label {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0.4rem 0.6rem 0.2rem;
}
.editorjs-wrap .conversion-toolbar__tools .ce-conversion-tool {
  border-radius: var(--radius);
}
.editorjs-wrap .ce-conversion-tool:hover { background: var(--primary-subtle); }
.editorjs-wrap .ce-conversion-tool__icon { background: var(--bg-muted); border-radius: var(--radius-sm); }

/* ── Popover (new EditorJS v2.28+) ── */
.editorjs-wrap .ce-popover {
  background: var(--bg-white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
.editorjs-wrap .ce-popover-item:hover,
.editorjs-wrap .ce-popover-item--focused {
  background: var(--primary-subtle);
}
.editorjs-wrap .ce-popover-item__icon {
  background: var(--bg-muted);
  border-radius: var(--radius-sm);
  color: var(--text-mid);
}
.editorjs-wrap .ce-popover-item--active .ce-popover-item__icon {
  background: var(--primary-light);
  color: var(--primary);
}
.editorjs-wrap .ce-popover__search .cdx-search-field {
  background: var(--bg-muted);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
}
.editorjs-wrap .ce-popover__search .cdx-search-field__input {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--text);
}

/* ── Block selected highlight ── */
.editorjs-wrap .ce-block--selected .ce-block__content {
  background: rgba(31, 127, 60, 0.05);
  border-radius: var(--radius);
}

/* ── Drag handle ── */
.editorjs-wrap .cdx-drag-handle { color: var(--text-placeholder); }

/* ── Focus ring removed (we handle it via wrapper) ── */
.editorjs-wrap .codex-editor--empty .ce-block:first-child .ce-paragraph::before {
  color: var(--text-placeholder);
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT BLOCKS shown when creating a new article
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_BLOCKS = {
  blocks: [
    { type: "header",    data: { text: "Introduction", level: 2 } },
    { type: "paragraph", data: { text: "" } },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ArticleEditor({ article, onSaved, onCancel }) {
  const isEdit = Boolean(article?._id);

  // ── Form fields (everything except content — that lives in EditorJS) ──
  const [title,   setTitle]   = useState(article?.title   ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [status,  setStatus]  = useState(article?.status  ?? "draft");
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [editorReady, setEditorReady] = useState(false);

  // ── EditorJS refs ──
  const editorRef     = useRef(null); // EditorJS instance
  const holderRef     = useRef(null); // DOM div EditorJS mounts into
  const styleInjected = useRef(false);

  // ── Inject CSS once ──
  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-editorjs-theme", "vastugyan");
    tag.textContent = EDITOR_CSS;
    document.head.appendChild(tag);
  }, []);

  // ── Mount EditorJS ──
  useEffect(() => {
    let editor = null;

    const initEditor = async () => {
      // Dynamically import so the bundle isn't huge if the admin is never visited
      const [
        { default: EditorJS   },
        { default: Header     },
        { default: List       },
        { default: Quote      },
        { default: Warning    },
        { default: Delimiter  },
      ] = await Promise.all([
        import("@editorjs/editorjs"),
        import("@editorjs/header"),
        import("@editorjs/list"),
        import("@editorjs/quote"),
        import("@editorjs/warning"),
        import("@editorjs/delimiter"),
      ]);

      if (!holderRef.current) return; // component unmounted

      editor = new EditorJS({
        holder: holderRef.current,

        data: article?.content ?? DEFAULT_BLOCKS,

        placeholder: "Start writing your article… Press Tab or / for blocks",

        tools: {
          header: {
            class: Header,
            config: { levels: [1, 2, 3], defaultLevel: 2 },
            shortcut: "CMD+SHIFT+H",
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: { defaultStyle: "unordered" },
            shortcut: "CMD+SHIFT+L",
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: { quotePlaceholder: "Enter a quote…", captionPlaceholder: "Author / source" },
            shortcut: "CMD+SHIFT+Q",
          },
          warning: {
            class: Warning,
            config: { titlePlaceholder: "Warning title", messagePlaceholder: "Warning message" },
          },
          delimiter: Delimiter,
        },

        onReady: () => setEditorReady(true),
      });

      editorRef.current = editor;
    };

    initEditor().catch((err) => {
      setError("Failed to load the editor. Make sure EditorJS packages are installed.");
      console.error("[ArticleEditor] EditorJS init error:", err);
    });

    // Cleanup on unmount
    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []); // run once on mount

  // ── Save ──
  const handleSave = useCallback(async () => {
    if (!title.trim()) {
      setError("Article title is required.");
      return;
    }
    if (!editorRef.current) {
      setError("Editor is not ready yet. Please wait a moment.");
      return;
    }

    let content;
    try {
      content = await editorRef.current.save();
    } catch {
      setError("Failed to read editor content. Please try again.");
      return;
    }

    if (!content.blocks?.length) {
      setError("Article content cannot be empty.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title:   title.trim(),
      excerpt: excerpt.trim(),
      content,
      status,
    };

    const data = isEdit
      ? await apiRequest(`/api/blogs/${article._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
      : await apiRequest("/api/blogs", {
          method: "POST",
          body: JSON.stringify(payload),
        });

    setSaving(false);

    if (data.success) {
      onSaved(data.blog);
    } else {
      setError(data.message ?? "Failed to save. Please try again.");
    }
  }, [title, excerpt, status, isEdit, article, onSaved]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="editor-panel">

      {/* ── Panel header ── */}
      <div className="editor-panel-header">
        <span className="editor-panel-title">
          {isEdit ? `Editing: ${article.title}` : "New Article"}
        </span>
        <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
          {!editorReady && (
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Loading editor…
            </span>
          )}
          <button
            className="btn btn-outline btn-sm"
            onClick={onCancel}
            disabled={saving}
          >
            Discard
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSave}
            disabled={saving || !editorReady}
          >
            {saving ? "Saving…" : isEdit ? "Update Article" : "Publish Article"}
          </button>
        </div>
      </div>

      {/* ── Panel body ── */}
      <div className="editor-panel-body">

        {/* Title */}
        <div className="form-group" style={{ marginBottom: "1.3rem" }}>
          <label className="form-label">Article Title *</label>
          <input
            className="form-input"
            style={{ fontSize: "1.1rem", fontWeight: 700, padding: "0.85rem 1rem", letterSpacing: "-0.2px" }}
            placeholder="Enter a compelling title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Excerpt + Status */}
        <div className="form-2col" style={{ marginBottom: "1.75rem" }}>
          <div className="form-group">
            <label className="form-label">Excerpt</label>
            <input
              className="form-input"
              placeholder="Short summary shown in listing cards…"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
            <span className="form-hint">
              Shown on blog listing cards. Keep under 160 characters.
            </span>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft — Not visible publicly</option>
              <option value="published">Published — Live on site</option>
            </select>
          </div>
        </div>

        {/* EditorJS content area */}
        <div className="form-group">
          <label className="form-label">Article Content</label>

          {/* Keyboard shortcut hint */}
          <div className="content-hint" style={{ marginBottom: "0" }}>
            <span className="content-hint-icon">⌨️</span>
            <span>
              Click anywhere below to start writing.&nbsp;
              Press <kbd style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "1px 5px", borderRadius: "3px", fontSize: "0.75rem", fontWeight: 700 }}>Tab</kbd> or type&nbsp;
              <kbd style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "1px 5px", borderRadius: "3px", fontSize: "0.75rem", fontWeight: 700 }}>/</kbd> to insert blocks —
              Heading, List, Quote, Warning, Delimiter.
            </span>
          </div>

          {/* Editor mount point */}
          <div
            style={{
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              marginTop: "0.65rem",
              background: "var(--bg-white)",
              transition: "border-color 0.18s",
              position: "relative",
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
            onBlur={(e)  => e.currentTarget.style.borderColor = "var(--border)"}
          >
            {/* Loading shimmer — shown until EditorJS is ready */}
            {!editorReady && (
              <div style={{ padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[85, 60, 90, 45, 70].map((w, i) => (
                  <div
                    key={i}
                    className="skeleton"
                    style={{ height: i === 0 ? 20 : 14, width: `${w}%`, borderRadius: "var(--radius-sm)" }}
                  />
                ))}
              </div>
            )}

            {/* EditorJS holder */}
            <div
              ref={holderRef}
              className="editorjs-wrap"
              style={{ display: editorReady ? "block" : "none" }}
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="form-error" style={{ marginTop: "0.9rem" }}>
            ⚠ {error}
          </div>
        )}

      </div>
    </div>
  );
}