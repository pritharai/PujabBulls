import React from "react";

const Spotlight = () => {
  return (
    <section className="py-20 bg-background-light overflow-hidden">
      <div className="px-4 md:px-10 lg:px-40 flex justify-center">
        <div className="max-w-300 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <span className="size-2 rounded-full bg-blue-600"></span>
                Microsoft Partner
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-[#101912] leading-tight">
                Mastering Microsoft Dynamics 365
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Unify your data, people, and processes with modern, intelligent
                business applications. We specialize in seamless Dynamics 365
                integration that adapts to your changing needs.
              </p>

              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-[#101912] font-medium">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  Intelligent Sales &amp; Marketing
                </li>

                <li className="flex items-center gap-3 text-[#101912] font-medium">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  Proactive Customer Service
                </li>

                <li className="flex items-center gap-3 text-[#101912] font-medium">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  Connected Field Service
                </li>
              </ul>

              <div className="pt-4">
                <a
                  className="text-primary font-bold inline-flex items-center gap-1"
                  href="#"
                >
                  Explore Dynamics Solutions
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            <div className="flex-1 relative w-full">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100 p-2">
                {/* Mock Dashboard Image */}
                <div
                  className="aspect-16/10 rounded-lg bg-gray-100 w-full bg-cover bg-top"
                  aria-label="Data dashboard displaying charts and graphs representing Microsoft Dynamics 365 interface"
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395683/microsoft-dynamics-365_qafzkb.png')",
                  }}
                ></div>
              </div>

              {/* Floating decoration */}
              <div className="absolute -bottom-6 -left-6 bg-secondary p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full text-primary">
                    <span className="material-symbols-outlined">
                      trending_up
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300 uppercase">Efficiency</p>
                    <p className="text-white font-bold text-lg">+45% ROI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
