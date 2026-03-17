import React from "react";

const faqs = [
  {
    q: "What ERP is best for rice mills?",
    a: "PunjabBulls Rice ERP built on Microsoft Dynamics Business Central helps rice mills manage procurement, milling, inventory and exports efficiently."
  },
  {
    q: "Can ERP track rice batch quality?",
    a: "Yes. The ERP tracks moisture levels, broken rice ratio and batch level quality parameters."
  },
  {
    q: "Does the ERP support rice exports?",
    a: "Yes. It supports export inspection, export invoicing and regulatory compliance processes."
  },
  {
    q: "Can ERP track BIN inventory?",
    a: "Yes. The system supports BIN, pallet and lot based inventory tracking."
  }
];

const RiceFAQ = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-background-light">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <details
              key={index}
              className="border rounded-lg p-5"
            >
              <summary className="font-semibold cursor-pointer">
                {faq.q}
              </summary>

              <p className="text-slate-600 mt-3 text-sm">
                {faq.a}
              </p>

            </details>
          ))}

        </div>

      </div>
    </section>
  );
};

export default RiceFAQ;