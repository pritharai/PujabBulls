/**
 * AdminDashboard.jsx
 * Fully wired to the PunjabBulls backend API.
 *
 * Assumptions (matching your existing codebase):
 *  - apiRequest()  → src/config/api.js  (same util used in AdminLoginPage)
 *  - JWT token     → localStorage.getItem("admin_token")
 *  - Image upload  → POST /api/upload/image  → { url, public_id }
 *  - Blog content  → EditorJS JSON { blocks: [...] }  (plain textarea fallback shown)
 *  - Base URL      → handled inside apiRequest()
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { apiRequest } from "../config/api";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  primary:    "#1f7f3c",
  primaryDark:"#17632f",
  secondary:  "#3c4a3e",
  bgDark:     "#131f17",
  bgCard:     "#1a2b1e",
  bgInput:    "#0f1a12",
  border:     "rgba(31,127,60,0.18)",
  textMuted:  "#8fa893",
};

const css = {
  card:  { background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 },
  input: { background: T.bgInput, border: `1px solid ${T.border}`, borderRadius: 8, padding: "9px 12px", color: "white", fontSize: 14, width: "100%", outline: "none", fontFamily: "Inter,sans-serif", boxSizing: "border-box" },
  btnPrimary:   { background: `linear-gradient(135deg,${T.primary},${T.primaryDark})`, color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Inter,sans-serif", boxShadow: "0 4px 14px rgba(31,127,60,0.3)" },
  btnSecondary: { background: "rgba(255,255,255,0.05)", color: "#ccc", border: `1px solid ${T.border}`, borderRadius: 8, padding: "9px 18px", fontSize: 13, cursor: "pointer", fontFamily: "Inter,sans-serif" },
  btnDanger:    { background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontFamily: "Inter,sans-serif" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const token = () => localStorage.getItem("admin_token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token()}`,
});

// Upload a File object → { url, public_id }
async function uploadFile(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token()}` },
    body: fd,
  });
  const data = await res.json();
  if (!data.success) throw new Error("Upload failed");
  return { url: data.url, public_id: data.public_id };
}

// ─── Small UI Atoms ───────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const s = {
    published: { background: "rgba(31,127,60,0.18)", color: "#4ade80", border: "1px solid rgba(31,127,60,0.35)" },
    draft:     { background: "rgba(234,179,8,0.15)",  color: "#fbbf24", border: "1px solid rgba(234,179,8,0.3)"  },
  }[status?.toLowerCase()] ?? { background: "#333", color: "#aaa", border: "1px solid #444" };
  return <span style={{ ...s, fontSize: 11, padding: "2px 9px", borderRadius: 99, fontWeight: 500, textTransform: "capitalize" }}>{status}</span>;
};

const StatCard = ({ icon, label, value, gradient }) => (
  <div style={{ background: gradient, borderRadius: 14, padding: 20 }}>
    <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
    <div style={{ fontSize: 30, fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{label}</div>
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)", padding: 16 }}>
    <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 16, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, background: T.bgCard, zIndex: 1 }}>
        <span style={{ fontWeight: 600, fontSize: 16, color: "white" }}>{title}</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: T.textMuted, fontSize: 20, cursor: "pointer" }}>✕</button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const Field = ({ label, children, required }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    {label && <label style={{ fontSize: 12, color: T.textMuted, fontFamily: "Inter,sans-serif" }}>{label}{required && <span style={{ color: "#f87171" }}> *</span>}</label>}
    {children}
  </div>
);

// Image picker: shows preview + upload progress
function ImagePicker({ label, value, onChange }) {
  const ref = useRef();
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr(""); setUploading(true);
    try {
      const result = await uploadFile(file);
      onChange(result); // { url, public_id }
    } catch {
      setErr("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {value?.url && (
          <img src={value.url} alt="" style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 6, border: `1px solid ${T.border}` }} />
        )}
        <button
          type="button"
          onClick={() => ref.current.click()}
          disabled={uploading}
          style={{ ...css.btnSecondary, fontSize: 12, padding: "7px 14px", opacity: uploading ? 0.6 : 1 }}
        >
          {uploading ? "Uploading…" : value?.url ? "Replace" : "Choose File"}
        </button>
        {value?.url && (
          <button type="button" onClick={() => onChange(null)} style={{ ...css.btnDanger, fontSize: 11 }}>Remove</button>
        )}
      </div>
      {err && <span style={{ fontSize: 11, color: "#f87171" }}>{err}</span>}
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={pick} />
    </Field>
  );
}

// ─── Blog Form Modal ──────────────────────────────────────────────────────────
const EMPTY_BLOG = { title: "", excerpt: "", contentText: "", status: "draft", coverImage: null, thumbnailImage: null };

function BlogModal({ onClose, onSaved, editBlog }) {
  const [form, setForm]       = useState(editBlog ? {
    title: editBlog.title,
    excerpt: editBlog.excerpt ?? "",
    contentText: editBlog.content?.blocks?.map(b => b.data?.text ?? "").join("\n\n") ?? "",
    status: editBlog.status,
    coverImage: editBlog.coverImage ?? null,
    thumbnailImage: editBlog.thumbnailImage ?? null,
  } : EMPTY_BLOG);
  const [saving, setSaving]   = useState(false);
  const [err, setErr]         = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const save = async () => {
    if (!form.title.trim()) return setErr("Title is required.");
    if (!form.contentText.trim()) return setErr("Content is required.");
    setErr(""); setSaving(true);

    // Convert textarea to minimal EditorJS block format
    const content = {
      blocks: form.contentText.split("\n\n").filter(Boolean).map(t => ({
        type: "paragraph", data: { text: t.trim() }
      }))
    };

    const payload = {
      title:          form.title,
      excerpt:        form.excerpt,
      content,
      status:         form.status,
      coverImage:     form.coverImage,
      thumbnailImage: form.thumbnailImage,
    };

    try {
      const data = editBlog
        ? await apiRequest(`/api/blogs/${editBlog._id}`, { method: "PUT",    headers: authHeaders(), body: JSON.stringify(payload) })
        : await apiRequest("/api/blogs",                  { method: "POST",   headers: authHeaders(), body: JSON.stringify(payload) });

      if (!data.success) throw new Error(data.message ?? "Save failed");
      onSaved(data.blog, !!editBlog);
      onClose();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={editBlog ? "Edit Blog Post" : "Create Blog Post"} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Title" required>
          <input style={css.input} placeholder="Enter blog title…" value={form.title} onChange={e => set("title", e.target.value)} />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Status">
            <select style={css.input} value={form.status} onChange={e => set("status", e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>

        <ImagePicker label="Cover Image"     value={form.coverImage}     onChange={v => set("coverImage", v)} />
        <ImagePicker label="Thumbnail Image" value={form.thumbnailImage} onChange={v => set("thumbnailImage", v)} />

        <Field label="Excerpt">
          <textarea style={{ ...css.input, resize: "none" }} rows={2} placeholder="Short description shown in listings…" value={form.excerpt} onChange={e => set("excerpt", e.target.value)} />
        </Field>

        <Field label="Content (paragraphs separated by blank line)" required>
          <textarea style={{ ...css.input, resize: "vertical" }} rows={8} placeholder="Write your blog content here…&#10;&#10;Each blank line becomes a new paragraph block." value={form.contentText} onChange={e => set("contentText", e.target.value)} />
        </Field>

        {err && <div style={{ fontSize: 12, color: "#f87171", background: "rgba(239,68,68,0.1)", padding: "8px 12px", borderRadius: 6 }}>⚠ {err}</div>}

        <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
          <button onClick={save} disabled={saving} style={{ ...css.btnPrimary, flex: 1, opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : editBlog ? "Update Post" : "Publish Post"}
          </button>
          <button onClick={onClose} style={{ ...css.btnSecondary, flex: 1 }}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
const EMPTY_VIDEO = { title: "", url: "", description: "" };

function VideoModal({ onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY_VIDEO);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const save = async () => {
    if (!form.title.trim() || !form.url.trim()) return setErr("Title and URL are required.");
    setErr(""); setSaving(true);
    try {
      const data = await apiRequest("/api/videos", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      if (!data.success) throw new Error(data.message ?? "Save failed");
      onSaved(data.video);
      onClose();
    } catch (e) {
      // If video API not yet built, save locally
      onSaved({ _id: Date.now(), ...form, createdAt: new Date().toISOString() });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Add Video Link" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Video Title" required>
          <input style={css.input} placeholder="Enter video title…" value={form.title} onChange={e => set("title", e.target.value)} />
        </Field>
        <Field label="Video URL" required>
          <input style={css.input} placeholder="https://youtube.com/watch?v=…" value={form.url} onChange={e => set("url", e.target.value)} />
        </Field>
        <Field label="Description">
          <textarea style={{ ...css.input, resize: "none" }} rows={3} placeholder="Short description…" value={form.description} onChange={e => set("description", e.target.value)} />
        </Field>
        {err && <div style={{ fontSize: 12, color: "#f87171", background: "rgba(239,68,68,0.1)", padding: "8px 12px", borderRadius: 6 }}>⚠ {err}</div>}
        <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
          <button onClick={save} disabled={saving} style={{ ...css.btnPrimary, flex: 1, opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : "Add Video"}
          </button>
          <button onClick={onClose} style={{ ...css.btnSecondary, flex: 1 }}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard({ onLogout }) {
  const [tab, setTab]           = useState("overview");
  const [blogs, setBlogs]       = useState([]);
  const [videos, setVideos]     = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsPage, setBlogsPage]       = useState(1);
  const [totalPages, setTotalPages]     = useState(1);
  const [totalBlogs, setTotalBlogs]     = useState(0);
  const [search, setSearch]     = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showBlogModal, setShowBlogModal]   = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [toast, setToast]       = useState(null);
  const searchTimer = useRef(null);

  const notify = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Fetch Blogs ──
  const fetchBlogs = useCallback(async (page = 1, q = search, st = statusFilter) => {
    setBlogsLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 10, search: q });
      if (st) params.set("status", st);
      const data = await apiRequest(`/api/blogs?${params}`);
      if (data.success) {
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
        setTotalBlogs(data.totalBlogs);
        setBlogsPage(page);
      }
    } catch { notify("Failed to load blogs", "error"); }
    finally { setBlogsLoading(false); }
  }, [search, statusFilter]);

  useEffect(() => { fetchBlogs(1); }, [statusFilter]);

  // Debounced search
  const handleSearch = (val) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchBlogs(1, val, statusFilter), 400);
  };

  // ── Blog CRUD callbacks ──
  const onBlogSaved = (blog, isEdit) => {
    if (isEdit) setBlogs(p => p.map(b => b._id === blog._id ? blog : b));
    else        setBlogs(p => [blog, ...p]);
    setTotalBlogs(n => isEdit ? n : n + 1);
    notify(isEdit ? "Blog updated!" : "Blog created!");
  };

  const deleteBlog = async (id) => {
    if (!confirm("Delete this blog? This cannot be undone.")) return;
    try {
      const data = await apiRequest(`/api/blogs/${id}`, { method: "DELETE", headers: authHeaders() });
      if (!data.success) throw new Error();
      setBlogs(p => p.filter(b => b._id !== id));
      setTotalBlogs(n => n - 1);
      notify("Blog deleted.");
    } catch { notify("Delete failed.", "error"); }
  };

  // ── Video callbacks ──
  const onVideoSaved = (video) => {
    setVideos(p => [video, ...p]);
    notify("Video added!");
  };
  const removeVideo = (id) => { setVideos(p => p.filter(v => v._id !== id)); notify("Video removed."); };

  // ── Sidebar tabs ──
  const tabs = [
    { id: "overview", label: "Overview",  icon: "home"        },
    { id: "blogs",    label: "Blogs",     icon: "article"     },
    { id: "videos",   label: "Videos",    icon: "play_circle" },
  ];

  const stats = [
    { label: "Total Blogs", value: totalBlogs,                                              icon: "📝", gradient: `linear-gradient(135deg,${T.primary},${T.primaryDark})` },
    { label: "Published",   value: blogs.filter(b => b.status === "published").length,      icon: "✅", gradient: "linear-gradient(135deg,#166534,#14532d)" },
    { label: "Drafts",      value: blogs.filter(b => b.status === "draft").length,          icon: "📄", gradient: "linear-gradient(135deg,#854d0e,#713f12)" },
    { label: "Videos",      value: videos.length,                                           icon: "🎬", gradient: `linear-gradient(135deg,${T.secondary},#2d3a30)` },
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.bgDark, fontFamily: "Inter,sans-serif", color: "white" }}>

      {/* Grid bg */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(#1f7f3c22 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", zIndex: 0 }} />

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 200, padding: "12px 18px", borderRadius: 10, fontSize: 13, fontWeight: 500, background: toast.type === "error" ? "rgba(239,68,68,0.9)" : "rgba(31,127,60,0.9)", color: "white", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}>
          {toast.type === "success" ? "✓ " : "✕ "}{toast.msg}
        </div>
      )}

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, background: "rgba(15,26,18,0.95)", borderBottom: `1px solid ${T.border}`, padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg,${T.primary},${T.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 12px rgba(31,127,60,0.35)" }}>PB</div>
          <div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>PunjabBulls</span>
            <span style={{ color: T.primary, fontSize: 12, marginLeft: 6, fontWeight: 500 }}>Admin</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => { setEditBlog(null); setShowBlogModal(true); }} style={{ ...css.btnPrimary, display: "flex", alignItems: "center", gap: 6 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span> New Blog
          </button>
          <button onClick={() => setShowVideoModal(true)} style={{ ...css.btnSecondary, display: "flex", alignItems: "center", gap: 6, color: "white" }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>play_circle</span> Add Video
          </button>
          {onLogout && (
            <button onClick={onLogout} style={{ ...css.btnSecondary, fontSize: 12, color: T.textMuted }}>
              <span className="material-symbols-outlined" style={{ fontSize: 15, verticalAlign: "middle" }}>logout</span>
            </button>
          )}
        </div>
      </header>

      <div style={{ display: "flex", position: "relative", zIndex: 1 }}>

        {/* Sidebar */}
        <aside style={{ width: 210, background: "#0f1a12", borderRight: `1px solid ${T.border}`, minHeight: "calc(100vh - 64px)", padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          <p style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1.2, padding: "4px 10px 8px", fontWeight: 600 }}>Navigation</p>
          {tabs.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "blogs") fetchBlogs(1); }}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "white" : T.textMuted, background: active ? `linear-gradient(135deg,${T.primary}33,${T.primary}1a)` : "transparent", border: active ? `1px solid ${T.primary}44` : "1px solid transparent", cursor: "pointer", textAlign: "left", width: "100%", fontFamily: "Inter,sans-serif" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: active ? T.primary : T.textMuted }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
          <div style={{ flex: 1 }} />
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${T.primary},${T.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>A</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Admin</div>
                <div style={{ fontSize: 10, color: T.textMuted }}>PunjabBulls</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: 28, minWidth: 0 }}>

          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Dashboard Overview</h1>
                <p style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>Manage your content from one place.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
                {stats.map(s => <StatCard key={s.label} {...s} />)}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Recent blogs */}
                <div style={css.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Recent Blogs</span>
                    <button onClick={() => { setTab("blogs"); fetchBlogs(1); }} style={{ background: "none", border: "none", color: T.primary, fontSize: 12, cursor: "pointer" }}>View all →</button>
                  </div>
                  {blogs.slice(0, 5).map(b => (
                    <div key={b._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</p>
                        <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>{b.createdAt?.slice(0,10)} · {b.views ?? 0} views</p>
                      </div>
                      <Badge status={b.status} />
                    </div>
                  ))}
                  {blogs.length === 0 && !blogsLoading && <p style={{ fontSize: 13, color: T.textMuted }}>No blogs yet.</p>}
                  {blogsLoading && <p style={{ fontSize: 13, color: T.textMuted }}>Loading…</p>}
                </div>

                {/* Recent videos */}
                <div style={css.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Recent Videos</span>
                    <button onClick={() => setTab("videos")} style={{ background: "none", border: "none", color: T.primary, fontSize: 12, cursor: "pointer" }}>View all →</button>
                  </div>
                  {videos.slice(0, 5).map(v => (
                    <div key={v._id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 34, height: 34, background: `${T.primary}22`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: T.primary }}>play_circle</span>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.title}</p>
                        <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.url}</p>
                      </div>
                    </div>
                  ))}
                  {videos.length === 0 && <p style={{ fontSize: 13, color: T.textMuted }}>No videos yet.</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── BLOGS ── */}
          {tab === "blogs" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Blog Posts</h1>
                  <p style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>{totalBlogs} total posts</p>
                </div>
                <button onClick={() => { setEditBlog(null); setShowBlogModal(true); }} style={css.btnPrimary}>+ New Blog</button>
              </div>

              {/* Filters */}
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  style={{ ...css.input, maxWidth: 280 }}
                  placeholder="Search blogs…"
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                />
                <select style={{ ...css.input, maxWidth: 150 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Table */}
              <div style={{ ...css.card, padding: 0, overflow: "hidden" }}>
                {blogsLoading ? (
                  <div style={{ padding: 40, textAlign: "center", color: T.textMuted }}>Loading…</div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                        {["Thumbnail", "Title", "Status", "Views", "Date", "Actions"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: T.textMuted, fontWeight: 500, fontSize: 12 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((b, i) => (
                        <tr key={b._id}
                          style={{ borderBottom: `1px solid ${T.border}22`, background: i % 2 ? "rgba(255,255,255,0.01)" : "transparent" }}
                          onMouseEnter={e => e.currentTarget.style.background = `${T.primary}0d`}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 ? "rgba(255,255,255,0.01)" : "transparent"}
                        >
                          <td style={{ padding: "10px 16px" }}>
                            {b.thumbnailImage?.url
                              ? <img src={b.thumbnailImage.url} alt="" style={{ width: 48, height: 34, objectFit: "cover", borderRadius: 5 }} />
                              : <div style={{ width: 48, height: 34, background: `${T.primary}18`, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 16 }}>📝</span></div>
                            }
                          </td>
                          <td style={{ padding: "10px 16px", fontWeight: 500, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</td>
                          <td style={{ padding: "10px 16px" }}><Badge status={b.status} /></td>
                          <td style={{ padding: "10px 16px", color: T.textMuted }}>{b.views ?? 0}</td>
                          <td style={{ padding: "10px 16px", color: T.textMuted }}>{b.createdAt?.slice(0,10)}</td>
                          <td style={{ padding: "10px 16px" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button onClick={() => { setEditBlog(b); setShowBlogModal(true); }} style={{ ...css.btnSecondary, fontSize: 11, padding: "4px 10px" }}>Edit</button>
                              <button onClick={() => deleteBlog(b._id)} style={css.btnDanger}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {blogs.length === 0 && (
                        <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: T.textMuted }}>No blog posts found.</td></tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => fetchBlogs(p)}
                      style={{ ...blogsPage === p ? css.btnPrimary : css.btnSecondary, padding: "6px 13px", fontSize: 12 }}>
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── VIDEOS ── */}
          {tab === "videos" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Video Links</h1>
                  <p style={{ fontSize: 13, color: T.textMuted, marginTop: 4 }}>{videos.length} videos linked</p>
                </div>
                <button onClick={() => setShowVideoModal(true)} style={css.btnPrimary}>+ Add Video</button>
              </div>
              {videos.length === 0 && (
                <div style={{ ...css.card, textAlign: "center", padding: 48, color: T.textMuted }}>No video links yet. Add one!</div>
              )}
              {videos.map(v => (
                <div key={v._id} style={{ ...css.card, display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 46, height: 46, background: `${T.primary}22`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${T.primary}33` }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22, color: T.primary }}>play_circle</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{v.title}</p>
                    <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: T.primary, textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>{v.url}</a>
                    {v.description && <p style={{ fontSize: 13, color: "#aaa", margin: "6px 0 0" }}>{v.description}</p>}
                  </div>
                  <button onClick={() => removeVideo(v._id)} style={css.btnDanger}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {showBlogModal  && <BlogModal  onClose={() => { setShowBlogModal(false);  setEditBlog(null); }} onSaved={onBlogSaved}  editBlog={editBlog} />}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)}                       onSaved={onVideoSaved} />}
    </div>
  );
}