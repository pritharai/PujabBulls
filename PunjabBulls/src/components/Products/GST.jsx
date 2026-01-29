import React from 'react'

const GST = () => {
  return (
    <section
      id="gst"
      className="py-20 px-4 md:px-20 lg:px-40 scroll-mt-20"
    >
      <h2 className="text-3xl font-bold mb-12 text-center">
        GST Automation &amp; E-Invoicing
      </h2>

      {/* Process Flow */}
      <div className="bg-slate-50 rounded-2xl p-8 lg:p-12 mb-16 border border-slate-300 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">

          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-300 z-0"></div>

          {/* ERP */}
          <div className="z-10 bg-white p-6 rounded-xl shadow-sm border border-slate-300 flex flex-col items-center w-40">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">
              database
            </span>
            <span className="font-bold text-xs uppercase tracking-tighter">
              ERP Data
            </span>
          </div>

          {/* GSTN */}
          <div className="z-10 bg-primary p-6 rounded-xl shadow-md flex flex-col items-center w-40 text-white">
            <span className="material-symbols-outlined text-3xl mb-2">
              cloud_sync
            </span>
            <span className="font-bold text-xs uppercase tracking-tighter">
              GSTN Portal
            </span>
          </div>

          {/* IRN */}
          <div className="z-10 bg-white p-6 rounded-xl shadow-sm border border-slate-300 flex flex-col items-center w-40">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">
              receipt_long
            </span>
            <span className="font-bold text-xs uppercase tracking-tighter">
              IRN/QR Code
            </span>
          </div>

          {/* Buyer */}
          <div className="z-10 bg-dark-olive p-6 rounded-xl shadow-md flex flex-col items-center w-40 text-white">
            <span className="material-symbols-outlined text-3xl mb-2">
              group
            </span>
            <span className="font-bold text-xs uppercase tracking-tighter">
              Buyer Recipient
            </span>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-t-4 border-primary">
          <h4 className="font-bold mb-3">
            Automatic Reconciliation
          </h4>
          <p className="text-slate-500 text-sm">
            Match GSTR-2B with your purchase register automatically to claim
            100% ITC.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-t-4 border-primary">
          <h4 className="font-bold mb-3">
            E-Way Bill Generation
          </h4>
          <p className="text-slate-500 text-sm">
            Generate E-Way bills directly from your ERP without visiting the
            government portal.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-t-4 border-primary">
          <h4 className="font-bold mb-3">
            One-Click Filing
          </h4>
          <p className="text-slate-500 text-sm">
            Review, validate, and file GST returns (GSTR-1, 3B, 9) with a single
            click.
          </p>
        </div>
      </div>
    </section>
  )
}

export default GST
