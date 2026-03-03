// src/pages/AdminLoginPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Admin sign-in page — dot-grid background, centered auth card
//
// Props:
//   onSuccess() — called after successful login (stores JWT, redirects)
//   onBack()    — go back to public blog

import { useState } from "react";
import { apiRequest } from "../config/api";
import { SITE_NAME }  from "../config/constants";

export default function AdminLoginPage({ onSuccess, onBack }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (data.success) {
      localStorage.setItem("admin_token", data.token);
      onSuccess();
    } else {
      setError(data.message ?? "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          {/* <div className="auth-logo-icon"></div> */}
          <span className="auth-logo-text">{SITE_NAME}</span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to access the content management system.</p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
        >
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="admin@vastugyan.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="form-error">⚠ {error}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            style={{ padding: "0.72rem", fontSize: "0.9rem", marginTop: "0.4rem" }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Back link */}
        <button
          className="btn btn-outline btn-full"
          style={{ marginTop: "0.75rem", padding: "0.68rem" }}
          onClick={onBack}
        >
          ← Back to Blog
        </button>

      </div>
    </div>
  );
}