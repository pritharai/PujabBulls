import React from "react";

const RiceHero = () => {
  return (
    <section className="relative py-24 px-6 md:px-20 grid-bg bg-background-light">
      <div className="max-w-5xl mx-auto text-center animate-fade-up">

        <h1 className="text-4xl md:text-5xl font-black text-secondary mb-6">
          Rice Mill ERP Software for Modern Rice Processing Plants
        </h1>

        <p className="text-slate-600 max-w-2xl mx-auto mb-8">
          PunjabBulls Rice ERP helps millers manage procurement, milling,
          quality control, inventory and exports through a single integrated
          system built on Microsoft Dynamics Business Central.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 cursor-pointer" onClick={() => (window.location.href = '/contact')}>
            Request Demo
          </button>

          <button className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition cursor-pointer" onClick={() => (window.location.href = '/products')}>
            View our Services
          </button>
        </div>

      </div>
    </section>
  );
};

export default RiceHero;