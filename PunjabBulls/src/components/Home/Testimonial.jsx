import React from "react";

const Testimonial = () => {
  return (
    <section className="py-20 bg-background-light border-t border-gray-100">
      <div className="px-4 md:px-10 lg:px-40 flex justify-center">
        <div className="max-w-300 w-full">
          {/* Logos */}
          <div className="mb-20">
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">
              Trusted by industry leaders
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-xl font-black text-gray-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">
                  token
                </span>
                ACME Corp
              </div>

              <div className="text-xl font-black text-gray-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">
                  pentagon
                </span>
                GlobalTech
              </div>

              <div className="text-xl font-black text-gray-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">
                  diamond
                </span>
                Apex Systems
              </div>

              <div className="text-xl font-black text-gray-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">
                  change_history
                </span>
                Delta Works
              </div>

              <div className="text-xl font-black text-gray-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">
                  circle
                </span>
                Orbit Inc
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <span className="material-symbols-outlined absolute top-6 right-6 text-gray-200 text-5xl">
                format_quote
              </span>

              <p className="text-lg text-gray-700 italic mb-6 relative z-10">
                "Punjabbulls transformed our inventory management with a custom
                Dynamics 365 implementation. We've seen a 30% increase in
                operational efficiency."
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="size-12 bg-gray-300 rounded-full bg-cover"
                  aria-label="Portrait of a business executive"
                  style={{
                    backgroundImage:
                      "url('/images/Testimonial_2.png')"
                  }}
                ></div>

                <div>
                  <h4 className="font-bold text-[#101912]">
                    James Wilson
                  </h4>
                  <p className="text-xs text-gray-500">
                    CTO, Manufacturing Plus
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <span className="material-symbols-outlined absolute top-6 right-6 text-gray-200 text-5xl">
                format_quote
              </span>

              <p className="text-lg text-gray-700 italic mb-6 relative z-10">
                "Their cloud migration strategy was flawless. Zero downtime and
                our team was fully supported throughout the entire transition
                period."
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="size-12 bg-gray-300 rounded-full bg-cover"
                  aria-label="Portrait of a female business manager"
                  style={{
                    backgroundImage:
                      "url('/images/Testimonial_1.png')"
                  }}
                ></div>

                <div>
                  <h4 className="font-bold text-[#101912]">
                    Sarah Jenkins
                  </h4>
                  <p className="text-xs text-gray-500">
                    VP of Operations, LogiTech
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
