import React from "react";

const ManufacturingSection = () => {
  return (
    <section
      id="manufacturing"
      className="py-24 bg-white scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        <div className="flex flex-col lg:flex-row gap-16">

          {/* LEFT COLUMN */}
          <div className="lg:w-1/3 space-y-8">

            {/* Header */}
            <div className="space-y-4">

              <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
                Industry 4.0
              </span>

              <h2 className="text-3xl lg:text-4xl font-bold">
                Smart Factory &amp; Manufacturing
              </h2>

              <p className="text-gray-600">
                Total shop floor control, from raw material procurement to
                finished goods packaging.
              </p>

            </div>

            {/* Progress Cards */}
            <div className="space-y-3">

              {[
                {
                  icon: "precision_manufacturing",
                  title: "Production Planning",
                  percent: "75%",
                },
                {
                  icon: "high_quality",
                  title: "Quality Assurance",
                  percent: "92%",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 bg-background-light rounded-lg border border-[#e9f1eb]"
                >

                  <h5 className="text-sm font-bold flex items-center gap-2">

                    <span className="material-symbols-outlined text-primary">
                      {item.icon}
                    </span>

                    {item.title}

                  </h5>

                  <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">

                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: item.percent }}
                    />

                  </div>

                </div>
              ))}

            </div>

            {/* Industries */}
            <div className="pt-6">

              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                Industries Served
              </h4>

              <div className="flex flex-wrap gap-2">

                {[
                  "Rice Manufacturing",
                  "Iron & Steel",
                  "FMCG",
                  "Robotics",
                  "Textiles",
                  "Automotive",
                  "Furniture"
                ].map((industry) => (
                  <span
                    key={industry}
                    className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded border border-gray-200"
                  >
                    {industry}
                  </span>
                ))}

              </div>
            </div>

          </div>

          {/* RIGHT GRID */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Highlight Card */}
            <div className="bg-primary p-8 rounded-2xl text-white flex flex-col justify-between">

              <div>

                <span className="material-symbols-outlined text-4xl mb-6">
                  settings_suggest
                </span>

                <h3 className="text-xl font-bold mb-3">
                  MRP Logic
                </h3>

                <p className="text-white/80 text-sm leading-relaxed">
                  Advanced Material Requirement Planning that optimizes stock
                  levels and avoids production bottlenecks.
                </p>

              </div>

              <a
                href="#"
                className="mt-6 font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform"
              >
                Detailed Feature List
                <span className="material-symbols-outlined text-sm">
                  north_east
                </span>
              </a>

            </div>

            {/* Feature Cards */}
            {[
              {
                icon: "verified_user",
                title: "Plant Maintenance",
                desc:
                  "Predictive and scheduled maintenance modules to maximize uptime and equipment longevity.",
              },
              {
                icon: "account_tree",
                title: "BOM Management",
                desc:
                  "Multi-level Bill of Materials with version control and dynamic cost calculations.",
              },
              {
                icon: "biotech",
                title: "Shop Floor Automation",
                desc:
                  "Direct machine integration for real-time production monitoring and OEE reporting.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-background-light p-8 rounded-2xl border border-[#e9f1eb] group hover:shadow-lg transition-all"
              >

                <span className="material-symbols-outlined text-4xl text-primary mb-6 block group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default ManufacturingSection;
