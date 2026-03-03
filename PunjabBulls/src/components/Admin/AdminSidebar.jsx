// src/components/Admin/AdminSidebar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Dark fixed sidebar for the admin CMS
//
// Props:
//   activeView       — current ADMIN_VIEWS key
//   onNavigate(view) — switch active view
//   onViewSite()     — go to public blog
//   onLogout()       — sign out

import { SITE_NAME } from "../../config/constants";

export const ADMIN_VIEWS = {
  LIST:    "list",
  NEW:     "new",
  EDIT:    "edit",
  PREVIEW: "preview",
};

export default function AdminSidebar({
  activeView,
  onNavigate,
  onViewSite,
  onLogout,
}) {
  const contentItems = [
    { id: ADMIN_VIEWS.LIST, icon: "📋", label: "All Articles" },
    { id: ADMIN_VIEWS.NEW,  icon: "✏️", label: "New Article"  },
  ];

  return (
    <aside className="admin-sidebar">

      {/* Logo / site name */}
      <div className="sidebar-header">
        <div className="sidebar-header-icon">🕉️</div>
        <div>
          <div className="sidebar-header-name">{SITE_NAME}</div>
          <div className="sidebar-header-sub">Content Management</div>
        </div>
      </div>

      {/* Content section */}
      <div className="sidebar-section-label">Content</div>
      {contentItems.map((item) => (
        <button
          key={item.id}
          className={`sidebar-item${activeView === item.id ? " active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="sidebar-item-icon">{item.icon}</span>
          {item.label}
        </button>
      ))}

      {/* Navigation section */}
      <div className="sidebar-section-label">Navigation</div>
      <button className="sidebar-item" onClick={onViewSite}>
        <span className="sidebar-item-icon">🌐</span>
        View Public Site
      </button>

      {/* Account section — pushed to bottom */}
      <div className="sidebar-spacer" />
      <div className="sidebar-section-label">Account</div>
      <button className="sidebar-item red" onClick={onLogout}>
        <span className="sidebar-item-icon">🚪</span>
        Sign Out
      </button>

    </aside>
  );
}
