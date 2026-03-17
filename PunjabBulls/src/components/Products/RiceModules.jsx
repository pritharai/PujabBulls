import React from "react";

const modules = [
  { icon: "shopping_cart", title: "Procurement Management", desc: "Manage paddy purchase, sauda booking and supplier approvals." },
  { icon: "factory", title: "Production Management", desc: "Track milling, polishing, grading and packaging workflows." },
  { icon: "inventory_2", title: "Inventory Control", desc: "Lot, batch and BIN based stock tracking for rice and by-products." },
  { icon: "science", title: "Quality Control", desc: "Monitor moisture, broken rice percentage and export quality parameters." },
  { icon: "account_balance_wallet", title: "Finance & Costing", desc: "Integrated costing, accounting and profitability analysis." },
  { icon: "local_shipping", title: "Export Management", desc: "Manage export orders, documentation and compliance processes." }
];

const RiceModules = () => {
  return (
    <section className="py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-12">
          Modules Included in Rice ERP
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {modules.map((module, index) => (
            <div
              key={index}
              className="p-6 border rounded-xl hover:shadow-md transition animate-fade-up"
            >
              <span className="material-symbols-outlined text-primary text-3xl mb-3">
                {module.icon}
              </span>

              <h4 className="font-semibold mb-2">{module.title}</h4>

              <p className="text-sm text-slate-600">
                {module.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default RiceModules;