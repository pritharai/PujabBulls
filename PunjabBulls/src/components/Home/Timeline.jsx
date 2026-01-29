import React from "react";

const Timeline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="px-4 md:px-10 lg:px-40 flex justify-center">
        <div className="max-w-300 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#101912]">
              Our Process
            </h2>
            <p className="mt-2 text-gray-600">
              A proven roadmap to success
            </p>
          </div>

          {/* Responsive Stepper */}
          <div className="relative">
            {/* Connecting line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="size-16 rounded-full bg-white border-4 border-primary text-primary flex items-center justify-center text-xl font-bold shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">
                    chat
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#101912] mb-2">
                  Consultation
                </h3>
                <p className="text-sm text-gray-500 max-w-50">
                  Understanding your unique business requirements and goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="size-16 rounded-full bg-white border-4 border-primary text-primary flex items-center justify-center text-xl font-bold shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">
                    architecture
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#101912] mb-2">
                  Planning
                </h3>
                <p className="text-sm text-gray-500 max-w-50">
                  Designing a comprehensive roadmap and technical architecture.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="size-16 rounded-full bg-white border-4 border-primary text-primary flex items-center justify-center text-xl font-bold shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">
                    build_circle
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#101912] mb-2">
                  Implementation
                </h3>
                <p className="text-sm text-gray-500 max-w-50">
                  Agile development and seamless deployment of solutions.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center group">
                <div className="size-16 rounded-full bg-white border-4 border-primary text-primary flex items-center justify-center text-xl font-bold shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined">
                    verified
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#101912] mb-2">
                  Support
                </h3>
                <p className="text-sm text-gray-500 max-w-50">
                  Ongoing maintenance, training, and performance optimization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
