import React from "react";

const IndustryHero = () => {
  return (
    <section className="relative overflow-hidden grid-bg pt-20 pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-primary/10 -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">

            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-[#101912]">
              ERP Solutions Tailored for{" "}
              <span className="text-primary">
                Retail, Distribution
              </span>{" "}
              &amp; Manufacturing
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Empower your enterprise with precision-engineered SaaS solutions
              designed for operational excellence across diverse supply chain
              networks.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">

              {/* Primary CTA */}
              <button className="flex items-center justify-center h-12 px-6 rounded-lg bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5 hover:cursor-pointer">
                Start Free Trial
              </button>

              {/* Secondary CTA */}
              <button className="flex items-center justify-center h-12 px-6 rounded-lg border border-[#d3e4d8] text-[#101912] text-base font-bold hover:bg-black/5 transition-all hover:cursor-pointer">
                View Case Studies
              </button>

            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="flex-1 w-full relative">

            <div className="w-full aspect-video bg-linear-to-br from-primary/20 to-primary/40 rounded-2xl shadow-2xl flex items-center justify-center p-8 border border-primary/20">

              {/* Abstract Visual */}
              <div className="w-full h-full border-2 border-dashed border-white/30 rounded-lg flex flex-col justify-center items-center text-primary">

                {/* BIGGER HUB ICON */}
                <span className="material-symbols-outlined text-[120px] md:text-[140px] mb-6" tyle={{ fontSize: '140px' }}>
                  hub
                </span>

                <div className="grid grid-cols-4 gap-4 w-3/4">
                  <div className="h-2 bg-white/40 rounded-full" />
                  <div className="h-2 bg-white/40 rounded-full" />
                  <div className="h-2 bg-white/40 rounded-full" />
                  <div className="h-2 bg-white/40 rounded-full" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustryHero;
