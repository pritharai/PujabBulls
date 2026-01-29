import React from 'react'

const TCS = () => {
  return (
    <section
      id="tcs"
      className="py-20 bg-dark-olive text-white px-4 md:px-20 lg:px-40 scroll-mt-20"
    >
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">
            Automated TCS Compliance
          </h2>

          <p className="text-slate-300 mb-8 max-w-[65ch] text-lg">
            Navigate the complex 206C(1H) regulations with our automated Tax
            Collected at Source (TCS) engine.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <span className="material-symbols-outlined text-primary">
                calculate
              </span>
              <div>
                <p className="font-bold">
                  Threshold Monitor
                </p>
                <p className="text-xs text-slate-400">
                  Auto-detects when a customer crosses the ₹50 Lakh threshold in
                  a financial year.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <span className="material-symbols-outlined text-primary">
                rule
              </span>
              <div>
                <p className="font-bold">
                  Smart Logic Cards
                </p>
                <p className="text-xs text-slate-400">
                  Dynamically applies correct rates based on PAN availability
                  and section type.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">
                    person_search
                  </span>
                </div>

                <div className="h-2 bg-white/20 rounded-full flex-1"></div>

                <div className="px-3 py-1 bg-primary rounded text-[10px] font-bold">
                  PAN CHECK
                </div>
              </div>

              <div className="flex items-center gap-4 justify-end">
                <div className="px-3 py-1 bg-primary/20 rounded text-[10px] font-bold border border-primary/40">
                  ELIGIBLE
                </div>

                <div className="h-2 bg-white/20 rounded-full w-24"></div>

                <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined">
                    payments
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-center text-xs text-slate-400 italic">
                  "Eliminate manual calculation errors and regulatory
                  penalties."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TCS
