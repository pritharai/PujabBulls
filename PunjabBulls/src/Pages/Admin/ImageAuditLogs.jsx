import { useEffect, useState } from "react";
import { getImageAuditLogs } from "../../services/auditService";

const EVENT_TYPE_OPTIONS = [
  "",
  "upload_success",
  "editor_upload_success",
  "blog_create_validation_failed",
  "blog_created",
  "blog_create_failed",
  "blog_update_plan_built",
  "blog_updated",
  "blog_update_failed",
  "blog_update_missing_blog",
  "blog_delete_requested",
  "blog_delete_failed",
  "cloudinary_delete_result",
  "cloudinary_delete_failed",
  "cloudinary_delete_skipped_shared_reference",
];

const LEVEL_OPTIONS = ["", "info", "warn", "error"];

function formatTimestamp(value) {
  if (!value) return "-";

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

function prettyJson(value) {
  if (!value || (typeof value === "object" && Object.keys(value).length === 0)) {
    return "-";
  }

  return JSON.stringify(value, null, 2);
}

function EventBadge({ level, eventType }) {
  const levelStyles = {
    info: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warn: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${levelStyles[level] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
        {(level || "info").toUpperCase()}
      </span>
      <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
        {eventType}
      </span>
    </div>
  );
}

export default function ImageAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalLogs: 0,
  });
  const [filters, setFilters] = useState({
    publicId: "",
    blogId: "",
    eventType: "",
    level: "",
    limit: "100",
  });

  const loadLogs = async (page = 1, nextFilters = filters) => {
    try {
      setLoading(true);
      setError("");

      const activeFilters = Object.fromEntries(
        Object.entries(nextFilters).filter(([, value]) => value !== ""),
      );

      const data = await getImageAuditLogs({
        ...activeFilters,
        page,
      });
      setLogs(data.logs || []);
      setPagination({
        page: data.page || page,
        totalPages: data.totalPages || 1,
        totalLogs: data.totalLogs || 0,
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load image audit logs",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loadLogs(1, filters);
  };

  const handleReset = async () => {
    const nextFilters = {
      publicId: "",
      blogId: "",
      eventType: "",
      level: "",
      limit: "100",
    };

    setFilters(nextFilters);
    await loadLogs(1, nextFilters);
  };

  const handlePageChange = async (page) => {
    if (page < 1 || page > pagination.totalPages || page === pagination.page) {
      return;
    }

    await loadLogs(page, filters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visiblePages = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1,
  ).filter((page) => Math.abs(page - pagination.page) <= 2);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#1f803c]">
                Admin Diagnostics
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Image Audit Logs
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                Inspect upload activity, update plans, delete attempts, rollback
                cleanup, shared-reference skips, and Cloudinary responses.
              </p>
            </div>

            <button
              type="button"
              onClick={loadLogs}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-[#1f803c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16632e] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Refreshing..." : "Refresh Logs"}
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Public ID</span>
              <input
                name="publicId"
                value={filters.publicId}
                onChange={handleChange}
                placeholder="blog_images/abc123"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-[#1f803c] focus:outline-none focus:ring-2 focus:ring-[#1f803c]/20"
              />
            </label>

            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Blog ID</span>
              <input
                name="blogId"
                value={filters.blogId}
                onChange={handleChange}
                placeholder="Mongo blog id"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-[#1f803c] focus:outline-none focus:ring-2 focus:ring-[#1f803c]/20"
              />
            </label>

            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Event Type</span>
              <select
                name="eventType"
                value={filters.eventType}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus:border-[#1f803c] focus:outline-none focus:ring-2 focus:ring-[#1f803c]/20"
              >
                {EVENT_TYPE_OPTIONS.map((option) => (
                  <option key={option || "all"} value={option}>
                    {option || "All events"}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Level</span>
              <select
                name="level"
                value={filters.level}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus:border-[#1f803c] focus:outline-none focus:ring-2 focus:ring-[#1f803c]/20"
              >
                {LEVEL_OPTIONS.map((option) => (
                  <option key={option || "all"} value={option}>
                    {option || "All levels"}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Limit</span>
              <input
                name="limit"
                type="number"
                min="1"
                max="500"
                value={filters.limit}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-[#1f803c] focus:outline-none focus:ring-2 focus:ring-[#1f803c]/20"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Loaded This Page</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              {logs.length}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Errors</div>
            <div className="mt-2 text-3xl font-bold text-red-600">
              {logs.filter((item) => item.level === "error").length}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Warnings</div>
            <div className="mt-2 text-3xl font-bold text-amber-600">
              {logs.filter((item) => item.level === "warn").length}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Total Matching Events</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              {pagination.totalLogs}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Deletes Tracked</div>
            <div className="mt-2 text-3xl font-bold text-[#1f803c]">
              {
                logs.filter((item) =>
                  String(item.eventType || "").startsWith("cloudinary_delete"),
                ).length
              }
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              Loading audit logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              No audit events found for the current filters.
            </div>
          ) : (
            logs.map((item) => (
              <article
                key={item._id || `${item.requestId}-${item.timestamp}-${item.eventType}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-3">
                    <EventBadge level={item.level} eventType={item.eventType} />
                    <div className="text-sm text-slate-500">
                      {formatTimestamp(item.timestamp)}
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2 xl:min-w-[40rem]">
                    <div>
                      <div className="font-semibold text-slate-900">Request</div>
                      <div>Request ID: {item.requestId || "-"}</div>
                      <div>Method: {item.method || "-"}</div>
                      <div className="break-all">Route: {item.route || "-"}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Actor</div>
                      <div>Role: {item.actor?.role || "-"}</div>
                      <div className="break-all">Email: {item.actor?.email || "-"}</div>
                      <div>IP: {item.actor?.ip || "-"}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Blog</div>
                      <div>ID: {item.blog?.id || "-"}</div>
                      <div>Slug: {item.blog?.slug || "-"}</div>
                      <div className="break-all">Title: {item.blog?.title || "-"}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Asset</div>
                      <div className="break-all">
                        Public ID: {item.asset?.publicId || "-"}
                      </div>
                      <div className="break-all">URL: {item.asset?.url || "-"}</div>
                      <div>Folder: {item.asset?.folder || "-"}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-950 p-4">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Details
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-100">
                    {prettyJson(item.details)}
                  </pre>
                </div>
              </article>
            ))
          )}
        </div>

        {!loading && pagination.totalPages > 1 && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-600">
                Page {pagination.page} of {pagination.totalPages}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                {visiblePages.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      page === pagination.page
                        ? "bg-[#1f803c] text-white"
                        : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
