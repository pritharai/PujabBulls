import VideoSection from "../components/VideoSection";
import SEO from "../components/SEO";
import { staticRouteMeta } from "../seo/routes";

const WhatIsBusinessCentral = () => {
  const meta = staticRouteMeta["/about/what-is-business-central"];

  return (
    <div className="bg-[var(--color-background-light)] min-h-screen font-[var(--font-family-sans)]">
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={meta.canonical}
        prerenderHint={meta.prerender}
      />

      {/* HERO */}
      <section className="grid-bg py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-secondary)] animate-fade-up">
          Microsoft Dynamics 365 Business Central
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-lg animate-fade-up animate-delay-1">
          A modern ERP solution that connects finance, sales, service,
          and operations into one intelligent business platform.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="max-w-3xl mx-auto text-center animate-fade-up animate-delay-1">
          <h2 className="text-2xl font-semibold text-[var(--color-secondary)] mb-4">
            What is Business Central?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Microsoft Dynamics 365 Business Central is a comprehensive business
            management solution designed for small and medium-sized businesses.
            It unifies financial management, sales, service, and operations
            within a single cloud platform.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition animate-fade-up">
            <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">
              monitoring
            </span>
            <h3 className="font-semibold mt-3 text-[var(--color-secondary)]">
              Financial Management
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Track budgets, cash flow, and financial performance in real time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition animate-fade-up animate-delay-1">
            <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">
              group
            </span>
            <h3 className="font-semibold mt-3 text-[var(--color-secondary)]">
              Customer Insights
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Manage sales pipelines and strengthen relationships with customers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition animate-fade-up animate-delay-2">
            <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">
              auto_awesome
            </span>
            <h3 className="font-semibold mt-3 text-[var(--color-secondary)]">
              Workflow Automation
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Automate repetitive processes and reduce manual work.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition animate-fade-up animate-delay-3">
            <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">
              hub
            </span>
            <h3 className="font-semibold mt-3 text-[var(--color-secondary)]">
              Microsoft Ecosystem
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Seamlessly integrate with Office 365, Power BI, and Azure.
            </p>
          </div>

        </div>

      </section>

      {/* VIDEO */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <VideoSection slug="what-is-business-central" />
        </div>
      </section>

    </div>
  );
};

export default WhatIsBusinessCentral;
