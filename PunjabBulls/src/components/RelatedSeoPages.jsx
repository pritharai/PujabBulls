import { Link } from "react-router-dom";
import { relatedSeoPages } from "../seo/generatedPages";

export default function RelatedSeoPages({
  currentPath,
  title = "Explore More",
  maxItems = 3,
}) {
  const items = relatedSeoPages
    .filter((page) => page.path !== currentPath)
    .slice(0, maxItems);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#1f803c] hover:shadow-sm"
          >
            <p className="text-lg font-semibold text-gray-900">
              {page.navLabel || page.heading}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {page.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
