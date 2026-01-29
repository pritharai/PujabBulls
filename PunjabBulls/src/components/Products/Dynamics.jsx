import React from 'react'

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
            <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
              <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 relative">
                {/* Top Bar */}
                <div className="absolute top-4 left-4 right-4 h-8 bg-white rounded shadow-sm flex items-center px-4 gap-4">
                  <div className="w-4 h-4 rounded-full bg-red-400"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>
                </div>

                {/* Sidebar */}
                <div className="absolute top-16 left-4 w-1/4 bottom-4 bg-white/50 rounded p-4 flex flex-col gap-4">
                  <div className="h-4 bg-primary/20 rounded w-full"></div>
                  <div className="h-4 bg-primary/10 rounded w-2/3"></div>
                  <div className="h-4 bg-primary/10 rounded w-3/4"></div>
                </div>

                {/* Charts */}
                <div className="absolute top-16 left-[30%] right-4 bottom-4 grid grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded border border-primary/10 flex flex-col justify-end p-4">
                    <div className="h-20 bg-primary/20 rounded-t-lg"></div>
                  </div>

                  <div className="bg-primary/5 rounded border border-primary/10 flex flex-col justify-end p-4">
                    <div className="h-12 bg-primary/20 rounded-t-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">
            Microsoft Dynamics 365
          </h2>

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
  )
}

export default Dynamics
