import React from "react";

const Dynamics = () => {
  return (
    <section
      id="dynamics"
      className="py-20 px-4 md:px-20 lg:px-40 scroll-mt-20"
    >
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* LEFT MOCKUP */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-xl p-4">
            <div className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02] aspect-video rounded-lg overflow-hidden border border-slate-200 bg-white/80 backdrop-blur shadow-lg p-4">
              <img
                src="/images/microsoft-dynamics-365.png"
                alt="Microsoft Dynamics 365 Dashboard"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Microsoft Dynamics 365</h2>

          <p className="text-slate-600 mb-8 max-w-[65ch]">
            Elevate your business operations with our certified implementation
            of Dynamics 365, specifically tuned for the unique tax and reporting
            requirements of Indian enterprises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-white border-l-4 border-primary shadow-sm">
              <span className="material-symbols-outlined text-primary mb-2">
                analytics
              </span>
              <h4 className="font-bold mb-2">Real-time Visibility</h4>
              <p className="text-sm text-slate-500">
                End-to-end financial tracking and automated reporting.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border-l-4 border-primary shadow-sm">
              <span className="material-symbols-outlined text-primary mb-2">
                verified_user
              </span>
              <h4 className="font-bold mb-2">Certified Expertise</h4>
              <p className="text-sm text-slate-500">
                Gold-standard implementation by localized ERP experts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dynamics;
