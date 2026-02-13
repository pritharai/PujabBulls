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
              Comprehensive enterprise technology solutions designed to streamline operations, modernize infrastructure, and accelerate digital transformation across industries.
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
  Streamline operations across Finance, Manufacturing, Inventory, Accounts Receivable, Accounts Payable, HR and Supply Chain with industry best practices built into Microsoft Dynamics 365 Business Central. We deliver end-to-end ERP implementation, customization, data migration, integration, and user training to ensure seamless digital transformation.
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
  Enhance customer engagement and accelerate revenue growth with intelligent CRM strategy. From customer journey mapping to sales automation and performance tracking, we design data-driven CRM ecosystems that improve lead conversion, retention, and customer lifetime value.
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
  Seamlessly migrate legacy systems to secure, scalable cloud environments. We assess infrastructure readiness, execute structured migration strategies, and optimize workloads across modern cloud platforms to enhance performance, security, and operational agility.
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
  Transform raw business data into actionable intelligence through advanced analytics, real-time dashboards, and business intelligence solutions. We empower decision-makers with predictive insights and performance monitoring tools for strategic growth.
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
  Build scalable, secure, and high-performance applications tailored to your unique operational needs. From enterprise software development to API integrations and workflow automation, we engineer solutions that align technology with business objectives.
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
  Ensure business continuity with proactive monitoring, system maintenance, and 24/7 technical support. Our managed IT services minimize downtime, enhance system reliability, and protect mission-critical infrastructure.
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
