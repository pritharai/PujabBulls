import { useEffect, useMemo, useState } from "react";
import {
  buildSeoPageCode,
  getSeoPagePathConflict,
  normalizeKeywords,
  slugifySeoPagePath,
} from "../../utils/seoPageGenerator";

function buildKeywordSuggestions(blog) {
  return normalizeKeywords([
    blog.title,
    blog.slug?.replace(/-/g, " "),
    "PunjabBulls",
    "ERP",
    "Microsoft Dynamics 365 Business Central",
  ]);
}

function buildInitialForm(blog) {
  return {
    slug: blog.slug || "",
    heading: blog.title || "",
    title: `${blog.title || "SEO Page"} | PunjabBulls`,
    description:
      blog.excerpt ||
      "Learn how PunjabBulls helps businesses improve operations with ERP, automation, and digital transformation.",
    excerpt: blog.excerpt || "",
    keywords: buildKeywordSuggestions(blog),
    navLabel: blog.title || "",
    order: "99",
    changefreq: "monthly",
    priority: "0.7",
    showInMoreMenu: false,
    showInFooter: true,
    showInRelatedSection: true,
  };
}

export default function SeoPageGeneratorModal({ blog, onClose }) {
  const [form, setForm] = useState(() => buildInitialForm(blog));
  const [copied, setCopied] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");
  const keywordSuggestions = useMemo(() => buildKeywordSuggestions(blog), [blog]);

  useEffect(() => {
    setForm(buildInitialForm(blog));
    setCopied(false);
    setKeywordInput("");
  }, [blog]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const path = slugifySeoPagePath(form.slug);
  const conflict = getSeoPagePathConflict(path);
  const code = useMemo(() => buildSeoPageCode(blog, form), [blog, form]);

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addKeyword = (value) => {
    const [nextKeyword] = normalizeKeywords(value);
    if (!nextKeyword) {
      return;
    }

    setForm((current) => ({
      ...current,
      keywords: normalizeKeywords([...current.keywords, nextKeyword]),
    }));
    setKeywordInput("");
  };

  const removeKeyword = (keywordToRemove) => {
    setForm((current) => ({
      ...current,
      keywords: current.keywords.filter((keyword) => keyword !== keywordToRemove),
    }));
  };

  const handleKeywordInputKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== ",") {
      return;
    }

    event.preventDefault();
    addKeyword(keywordInput);
  };

  const handleCopy = async () => {
    if (conflict) {
      return;
    }

    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex h-full items-center justify-center">
        <div className="flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#1f803c]">
                Generate Page
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">{blog.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                One paste-ready entry for <code>src/seo/generatedPages.js</code>.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-800"
              aria-label="Close generator"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="seo-modal-scroll min-h-0 overflow-y-auto border-b border-gray-200 px-6 py-6 lg:border-b-0 lg:border-r">
              <div className="space-y-5 pb-2">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">URL Slug</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(event) => handleChange("slug", event.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                      placeholder="paddy-rice-erp-planning"
                    />
                    <span className="mt-2 block text-xs text-gray-500">
                      Final URL: <code>{path || "/your-page-slug"}</code>
                    </span>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">Navbar Label</span>
                    <input
                      type="text"
                      value={form.navLabel}
                      onChange={(event) => handleChange("navLabel", event.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                      placeholder="ERP Rice"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700">H1 Heading</span>
                  <input
                    type="text"
                    value={form.heading}
                    onChange={(event) => handleChange("heading", event.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700">SEO Title</span>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) => handleChange("title", event.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700">Meta Description</span>
                  <textarea
                    rows="3"
                    value={form.description}
                    onChange={(event) => handleChange("description", event.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700">Intro Excerpt</span>
                  <textarea
                    rows="3"
                    value={form.excerpt}
                    onChange={(event) => handleChange("excerpt", event.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-700">SEO Keywords</span>
                  <div className="rounded-2xl border border-gray-200 px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {form.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="inline-flex items-center gap-2 rounded-full bg-[#eef8f1] px-3 py-1 text-sm text-[#1f803c]"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="text-[#1f803c] transition hover:text-[#15592a]"
                            aria-label={`Remove ${keyword}`}
                          >
                            <span className="material-symbols-outlined text-base">close</span>
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        value={keywordInput}
                        onChange={(event) => setKeywordInput(event.target.value)}
                        onKeyDown={handleKeywordInputKeyDown}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                        placeholder="Add a keyword and press Enter"
                      />
                      <button
                        type="button"
                        onClick={() => addKeyword(keywordInput)}
                        className="rounded-xl bg-[#1f803c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#15592a]"
                      >
                        Add Keyword
                      </button>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                        Suggested keywords
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {keywordSuggestions.map((keyword) => {
                          const alreadyAdded = form.keywords.includes(keyword);

                          return (
                            <button
                              key={keyword}
                              type="button"
                              onClick={() => addKeyword(keyword)}
                              disabled={alreadyAdded}
                              className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 transition hover:border-[#1f803c] hover:text-[#1f803c] disabled:cursor-not-allowed disabled:border-[#1f803c] disabled:bg-[#eef8f1] disabled:text-[#1f803c]"
                            >
                              {alreadyAdded ? `${keyword} added` : keyword}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-gray-500">
                      These keywords are optional. The generated page code will include exactly
                      the keywords selected here.
                    </p>
                  </div>
                </label>

                <div className="grid gap-5 md:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">Priority</span>
                    <select
                      value={form.priority}
                      onChange={(event) => handleChange("priority", event.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                    >
                      <option value="0.6">0.6</option>
                      <option value="0.7">0.7</option>
                      <option value="0.8">0.8</option>
                      <option value="0.9">0.9</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">Change Frequency</span>
                    <select
                      value={form.changefreq}
                      onChange={(event) => handleChange("changefreq", event.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                    >
                      <option value="weekly">weekly</option>
                      <option value="monthly">monthly</option>
                      <option value="yearly">yearly</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-gray-700">Sort Order</span>
                    <input
                      type="number"
                      min="1"
                      value={form.order}
                      onChange={(event) => handleChange("order", event.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1f803c]"
                    />
                  </label>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <label className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={form.showInMoreMenu}
                      onChange={(event) => handleChange("showInMoreMenu", event.target.checked)}
                    />
                    Show in More menu
                  </label>

                  <label className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={form.showInFooter}
                      onChange={(event) => handleChange("showInFooter", event.target.checked)}
                    />
                    Show in footer
                  </label>

                  <label className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={form.showInRelatedSection}
                      onChange={(event) => handleChange("showInRelatedSection", event.target.checked)}
                    />
                    Show in related links
                  </label>
                </div>

                {conflict ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {conflict}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Path is available. This page will resolve at <code>{path}</code> after
                    the generated entry is pasted and deployed.
                  </div>
                )}
              </div>
            </div>

            <div className="flex min-h-0 flex-col bg-[#0f172a] p-5 text-white">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold">Paste Into</p>
                  <p className="mt-1 text-xs text-slate-300">
                    <code>src/seo/generatedPages.js</code>
                  </p>
                </div>

                <button
                  onClick={handleCopy}
                  disabled={Boolean(conflict)}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copied ? "Copied" : "Copy Entry"}
                </button>
              </div>

              <div className="mt-5 min-h-0 flex-1 rounded-2xl bg-slate-950/80 p-4">
                <pre className="seo-code-scroll h-full max-h-[420px] overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-100 lg:max-h-none">
                  <code>{code}</code>
                </pre>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                <p>
                  Paste the entry inside the exported <code>generatedSeoPages</code> array.
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
