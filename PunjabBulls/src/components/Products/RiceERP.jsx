import React from "react";
import RiceProcessFlow from "./RiceProcessFlow";

const RiceERP = () => {
  return (
    <section
      id="rice"
      className="py-20 px-4 md:px-20 lg:px-40 scroll-mt-20"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">
          ERP Solutions for the Rice Industry
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Industry-specific ERP built by PunjabBulls Technology Pvt Ltd on
          Microsoft Dynamics Business Central, designed exclusively for
          rice millers, processors, and exporters.
        </p>
      </div>

      <RiceProcessFlow />

      <div className="grid place-items-start grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined">factory</span>
          </div>

          <h3 className="font-bold text-xl mb-4">Rice Mill Operations</h3>

          <ul className="text-slate-500 text-sm space-y-2">
            <li>Sauda booking & approvals with mobile-ready workflows</li>
            <li>Gate entry, quality control, and unloading workflows</li>
            <li>Moisture, yield, and rejection tracking</li>
            <li>Production, BIN, and pallet management</li>
          </ul>
        </div>

        <div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>

          <h3 className="font-bold text-xl mb-4">
            Inventory and Quality Control
          </h3>

          <ul className="text-slate-500 text-sm space-y-2">
            <li>Lot, batch, and BIN-wise inventory</li>
            <li>Bardana and bag tracking with KG-based units of measure</li>
            <li>Lab quality checks and quality parameters</li>
            <li>Auto debit notes for rejected quantities</li>
          </ul>
        </div>

        <div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined">
              account_balance_wallet
            </span>
          </div>

          <h3 className="font-bold text-xl mb-4">Finance, Costing and Export</h3>

          <ul className="text-slate-500 text-sm space-y-2">
            <li>Integrated costing and production valuation</li>
            <li>Export inspection and export quality control</li>
            <li>Export invoices, E-Way Bills, and compliance</li>
            <li>TDS, multi-currency, and profitability tracking</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RiceERP;
