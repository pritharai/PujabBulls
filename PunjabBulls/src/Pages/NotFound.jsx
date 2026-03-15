import { ArrowRight, Home, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { staticRouteMeta } from "../seo/routes";

export default function NotFound() {
  const meta = staticRouteMeta["/404"];

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        noindex
        prerenderHint={meta.prerender}
      />

      <section className="relative overflow-hidden bg-[var(--color-background-light)]">
        <div className="absolute inset-0 grid-bg opacity-70" aria-hidden="true" />
        <div
          className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-primary)]/12 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-168px)] max-w-7xl items-center px-6 py-20">
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="animate-fade-up">
              <span className="inline-flex rounded-full border border-[var(--color-primary)]/15 bg-white px-4 py-2 text-xs font-semibold tracking-[0.3em] text-[var(--color-primary)] uppercase shadow-sm">
                Error 404
              </span>

              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-[var(--color-secondary)] md:text-6xl">
                This page has moved or does not exist.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#5f6d61] md:text-lg">
                The link may be outdated, or the page may have been removed. You
                can return to the homepage or contact our team to find the right
                solution faster.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-primary/90"
                >
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-secondary)]/12 bg-white px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] shadow-sm transition hover:border-[var(--color-primary)]/30 hover:text-[var(--color-primary)]"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="animate-fade-up animate-delay-1">
              <div className="rounded-[28px] border border-white/80 bg-white/90 p-8 shadow-[0_24px_80px_rgba(19,31,23,0.08)] backdrop-blur">
                <div className="rounded-3xl bg-[linear-gradient(135deg,#163726_0%,#1f7f3c_58%,#6eb783_100%)] p-8 text-white">
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/70">
                    PunjabBulls
                  </p>
                  <div className="mt-5 flex items-end gap-3">
                    <span className="text-7xl font-black leading-none">404</span>
                    <span className="pb-3 text-sm text-white/75">
                      Page not found
                    </span>
                  </div>
                  <p className="mt-6 max-w-sm text-sm leading-6 text-white/85">
                    Explore our products, industries, and consulting expertise to
                    continue your journey.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    { label: "Explore Products", to: "/products" },
                    { label: "View Industries", to: "/industries" },
                    { label: "Read About Us", to: "/about" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center justify-between rounded-2xl border border-[var(--color-accent-gray)] bg-[var(--color-background-light)] px-5 py-4 text-sm font-semibold text-[var(--color-secondary)] transition hover:border-[var(--color-primary)]/30 hover:bg-white hover:text-[var(--color-primary)]"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
