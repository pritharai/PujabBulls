import React from "react";

const Service = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="px-4 md:px-10 lg:px-40 flex justify-center">
        <div className="max-w-300 w-full flex flex-col">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#101912]">
              Core Services
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Comprehensive technology solutions designed to streamline your
              operations and drive efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-[#f9fbf9] p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  database
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#101912]">
                  ERP Implementation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Streamline operations across finance, HR, and supply chain
                  with tailored ERP solutions.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-[#f9fbf9] p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  groups
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#101912]">
                  CRM Strategy
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enhance customer relationships and drive sales with
                  data-driven CRM strategies.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-[#f9fbf9] p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  cloud_upload
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#101912]">
                  Cloud Migration
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Seamlessly move your legacy infrastructure to secure and
                  scalable cloud environments.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-[#f9fbf9] p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  analytics
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#101912]">
                  Data Analytics
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Turn raw data into actionable business insights with advanced
                  visualization tools.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-[#f9fbf9] p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  code
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#101912]">
                  Custom Development
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Bespoke software solutions engineered to solve unique complex
                  business challenges.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="group flex flex-col gap-4 rounded-xl border border-[#e5e7eb] bg-[#f9fbf9] p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  support_agent
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#101912]">
                  IT Support
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Reliable 24/7 support ensuring your critical infrastructure
                  never misses a beat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
