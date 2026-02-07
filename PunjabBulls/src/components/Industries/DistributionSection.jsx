import React from "react";

const DistributionSection = () => {
  return (
    <section
      id="distribution"
      className="py-24 bg-background-light scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
            Supply Chain Control
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold mt-4">
            Unified Channel Distribution
          </h2>

          <p className="text-gray-600 mt-2">
            Connecting warehouses, stockists, and retailers in a single digital
            ecosystem.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT VISUAL */}
          <div className="order-2 lg:order-1 relative">

            <div className="bg-white rounded-2xl shadow-2xl p-4">

              <div className="flex gap-4">

                {/* SIDEBAR */}
                <aside className="w-16 flex flex-col gap-4">

                  <div className="size-10 bg-primary/20 rounded flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">
                      dashboard
                    </span>
                  </div>

                  <div className="size-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined">
                      list_alt
                    </span>
                  </div>

                  <div className="size-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined">
                      settings
                    </span>
                  </div>

                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 space-y-4">

                  <div className="h-8 w-1/3 bg-gray-100 rounded" />

                  <div className="grid grid-cols-3 gap-3">

                    {[
                      { label: "Total Orders", value: "1,284" },
                      { label: "In Transit", value: "42" },
                      { label: "Pending", value: "08" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="h-24 bg-primary/5 border border-primary/20 rounded-lg p-3"
                      >
                        <div className="text-[10px] text-gray-400">
                          {stat.label}
                        </div>
                        <div className="text-xl font-bold">
                          {stat.value}
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* MAP */}
                  <div className="h-48 bg-gray-50 rounded-lg border border-dashed border-gray-300 relative">

                    <svg
                      className="absolute inset-0 w-full h-full text-primary opacity-30"
                      viewBox="0 0 400 200"
                    >
                      <circle cx="50" cy="150" r="4" fill="currentColor" />
                      <circle cx="200" cy="50" r="4" fill="currentColor" />
                      <circle cx="350" cy="150" r="4" fill="currentColor" />

                      <path
                        d="M50 150 Q 200 150 200 50 T 350 150"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="4"
                        strokeWidth="2"
                      />
                    </svg>

                  </div>

                </main>

              </div>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="order-1 lg:order-2 space-y-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {[
                {
                  icon: "storefront",
                  title: "B2B Portal",
                  desc:
                    "Allow retailers to place orders directly via a dedicated app or web interface.",
                },
                {
                  icon: "barcode_reader",
                  title: "Batch Tracking",
                  desc:
                    "Precise expiry management and FEFO/FIFO stock movement control.",
                },
                {
                  icon: "account_balance",
                  title: "Finance & Credit",
                  desc:
                    "Manage dealer credit limits, auto-billing, and collection workflows.",
                },
                {
                  icon: "insights",
                  title: "Sales Intelligence",
                  desc:
                    "Real-time secondary sales data to optimize primary distribution.",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-3">

                  <h4 className="font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      {item.icon}
                    </span>
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.desc}
                  </p>

                </div>
              ))}

            </div>

            

          </div>
        </div>
      </div>
    </section>
  );
};

export default DistributionSection;
