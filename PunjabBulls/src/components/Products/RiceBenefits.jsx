import React from "react";

const benefits = [
  "Real-time production monitoring",
  "Batch-level traceability for rice inventory",
  "Automated costing and profitability analysis",
  "Quality monitoring for export compliance",
  "Reduced inventory loss and manual errors",
  "Better procurement and supplier management"
];

const RiceBenefits = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-background-light">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-12">
          Benefits of PunjabBulls Rice ERP
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-left">

          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 animate-fade-up"
            >
              <span className="material-symbols-outlined text-primary">
                check_circle
              </span>

              <p className="text-slate-700">{benefit}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default RiceBenefits;