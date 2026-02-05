import React from "react";

const IndustryCTA = () => {
  return (
    <section className="py-20 bg-dark-olive text-white relative overflow-hidden">

      {/* Decorative Lines */}
      <svg
        className="absolute top-0 right-0 h-full opacity-10"
        fill="none"
        width="400"
        height="400"
        viewBox="0 0 400 400"
      >
        <path d="M400 0L0 400" stroke="white" strokeWidth="20" />
        <path d="M400 100L100 400" stroke="white" strokeWidth="20" />
        <path d="M400 200L200 400" stroke="white" strokeWidth="20" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT */}
          <div className="max-w-2xl text-center md:text-left">

            <h2 className="text-3xl lg:text-5xl font-black mb-6">
              Transform your industry operations with Punjabbulls ERP
            </h2>

            <p className="text-lg text-white/70 mb-8">
              Join hundreds of industry leaders who have optimized their supply
              chain with our enterprise-ready SaaS solutions.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">

              <button className="bg-primary hover:cursor-pointer text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-black/20 hover:-translate-y-0.5">
                Schedule a Demo
              </button>

              <button className="bg-white/10 border hover:cursor-pointer border-white/20 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all hover:-translate-y-0.5">
                Talk to Sales
              </button>

            </div>
          </div>

          {/* RIGHT ICON */}
          <div className="hidden lg:block">

            <div className="size-48 rounded-full border-12 border-primary/20 flex items-center justify-center">

              <span className="material-symbols-outlined text-7xl text-primary">
                rocket_launch
              </span>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustryCTA;
