import React from "react";

const RetailSection = () => {
  return (
    <section
      id="retail"
      className="py-24 bg-white scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        {/* TOP ROW */}
        <div className="flex flex-col lg:flex-row gap-16 mb-20 items-center">

          {/* LEFT TEXT */}
          <div className="flex-1 space-y-6">

            <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
              Retail Excellence
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold">
              Omnichannel Mastery for Modern Retailers
            </h2>

            <p className="text-gray-600">
              Seamlessly integrate your physical stores and digital storefronts
              with real-time inventory and customer insights.
            </p>

            <div className="space-y-4">

              {/* Bullet 1 */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                <div>
                  <h4 className="font-bold">Unified Inventory</h4>
                  <p className="text-sm text-gray-500">
                    One source of truth for all sales channels.
                  </p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
                <div>
                  <h4 className="font-bold">Customer Loyalty CRM</h4>
                  <p className="text-sm text-gray-500">
                    Inbuilt programs to drive repeat business.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT MOCKUP */}
          <div className="flex-1 bg-background-light rounded-2xl p-6">

            <div className="w-full aspect-4/3 bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">

              {/* Header */}
              <div className="bg-primary p-4 text-white flex justify-between items-center">
                <span className="text-sm font-bold">Terminal #012</span>
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 p-4 grid grid-cols-3 gap-4">

                {/* Left */}
                <div className="col-span-2 space-y-4">

                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-20 bg-gray-100 rounded border border-dashed border-gray-300" />
                    <div className="h-20 bg-gray-100 rounded border border-dashed border-gray-300" />
                    <div className="h-20 bg-gray-100 rounded border border-dashed border-gray-300" />
                  </div>

                  <div className="h-40 bg-gray-50 rounded p-4">
                    <div className="space-y-2">

                      <div className="flex justify-between border-b pb-1">
                        <span className="text-xs">Product A x 1</span>
                        <span className="text-xs font-bold">$12.00</span>
                      </div>

                      <div className="flex justify-between border-b pb-1">
                        <span className="text-xs">Product B x 2</span>
                        <span className="text-xs font-bold">$45.00</span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right */}
                <div className="space-y-4">

                  <div className="bg-primary/10 h-10 rounded flex items-center justify-center text-primary font-bold text-xs">
                    PAY $57.00
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 bg-gray-200 rounded" />
                    <div className="h-8 bg-gray-200 rounded" />
                    <div className="h-8 bg-gray-200 rounded" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            {
              icon: "qr_code_scanner",
              title: "Advanced POS",
              desc:
                "Cloud-native terminal with offline capabilities and mobile integration.",
            },
            {
              icon: "inventory_2",
              title: "Inventory Logic",
              desc:
                "Automated stock replenishment and shrinkage tracking across branches.",
            },
            {
              icon: "analytics",
              title: "Sales Forecast",
              desc:
                "AI-driven demand forecasting based on historical retail data patterns.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-white border border-[#e9f1eb] rounded-xl hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-3xl text-primary mb-4 block">
                {item.icon}
              </span>

              <h3 className="text-lg font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default RetailSection;
