import React from 'react'

const RiceERP = () => {
  return (
    <section
      id="rice"
      className="py-20 px-4 md:px-20 lg:px-40 scroll-mt-20"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">
          Rice Industry Specialized ERP
        </h2>
        <p className="text-slate-600">
          The first-ever ERP built from the ground up for modern Rice Millers
          and Exporters.
        </p>
      </div>

      {/* Illustration */}
{/* Illustration */}
<div
  className="
    relative w-full bg-slate-200 rounded-3xl mb-16 overflow-hidden
    flex items-end justify-center

    min-h-65
    sm:min-h-75
    md:aspect-16/8
    lg:aspect-16/7
    max-h-110

    px-3 sm:px-0
  "
>

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

  {/* Decorative Plant Elements */}
  <div className="absolute inset-x-0 bottom-0 flex justify-center items-end gap-1 sm:gap-3 md:gap-4 pb-5 sm:pb-6 z-10 h-full">

    <div className="w-10 sm:w-20 md:w-24 h-[40%] bg-primary/40 rounded-t-xl" />

    <div className="w-14 sm:w-24 md:w-32 h-[65%] bg-primary/60 rounded-t-xl" />

    <div className="w-16 sm:w-32 md:w-40 h-[60%] bg-primary rounded-t-xl" />

    <div className="w-12 sm:w-20 md:w-28 h-[45%] bg-primary/40 rounded-t-xl" />
  </div>

  {/* Status Card */}
  <div className="absolute top-2 left-2 sm:top-5 sm:left-5 bg-white/90 p-2 sm:p-4 rounded-lg shadow-lg max-w-30 sm:max-w-40">
    <p className="text-[9px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
      Milling Status
    </p>

    <p className="text-lg sm:text-2xl font-black text-primary">
      Active
    </p>
  </div>
</div>





      {/* Feature Grid */}
      <div className="grid place-items-center grid-cols-1 md:grid-cols-3 gap-12">
        {/* Operations */}
        <div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined">
              factory
            </span>
          </div>

          <h4 className="font-bold text-xl mb-4">
            Operations
          </h4>

          <ul className="text-slate-500 text-sm space-y-2">
            <li>• Procurement from Mandi</li>
            <li>• Moisture &amp; Yield Tracking</li>
            <li>• Processing &amp; Sorting Logs</li>
          </ul>
        </div>

        {/* Finance */}
        <div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined">
              account_balance_wallet
            </span>
          </div>

          <h4 className="font-bold text-xl mb-4">
            Finance
          </h4>

          <ul className="text-slate-500 text-sm space-y-2">
            <li>• Exporter Compliance</li>
            <li>• Multi-currency support</li>
            <li>• Automatic TDS deductions</li>
          </ul>
        </div>

        {/* Inventory */}
        <div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
            <span className="material-symbols-outlined">
              inventory_2
            </span>
          </div>

          <h4 className="font-bold text-xl mb-4">
            Inventory
          </h4>

          <ul className="text-slate-500 text-sm space-y-2">
            <li>• Bardana/Bag Management</li>
            <li>• Batch-wise Ageing</li>
            <li>• Quality Lab Integration</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default RiceERP
