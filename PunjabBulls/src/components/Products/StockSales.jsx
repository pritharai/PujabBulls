import React from 'react'

const StockSales = () => {
  return (
    <section
      id="stock"
      className="py-20 bg-white px-4 md:px-20 lg:px-40 scroll-mt-20"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">
          Stock &amp; Sales Management
        </h2>
        <p className="text-slate-600">
          Transform your supply chain from a cost center to a competitive
          advantage.
        </p>
      </div>

      {/* Main Row */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-20">
        {/* Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md aspect-square bg-primary/5 rounded-full relative flex items-center justify-center p-8">
            <div className="w-full h-full border-2 border-dashed border-primary/20 rounded-full absolute animate-spin-slow"></div>

            <div className="bg-white p-6 rounded-xl shadow-lg relative z-10 text-center">
              <span className="material-symbols-outlined text-primary text-5xl mb-4">
                inventory
              </span>
              <div className="text-2xl font-black text-primary">
                99.8%
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-slate-400">
                Inventory Accuracy
              </div>
            </div>

            <div className="absolute top-0 right-4 bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
              <span className="material-symbols-outlined text-green-500">
                trending_up
              </span>
              <span className="text-xs font-bold">
                Sales Growth
              </span>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="w-full lg:w-1/2">
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-sm">
                  check
                </span>
              </div>
              <div>
                <h4 className="font-bold">
                  Distributor Analytics
                </h4>
                <p className="text-slate-500 text-sm max-w-[65ch]">
                  Track secondary and tertiary sales across thousands of
                  touchpoints in real-time.
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-sm">
                  check
                </span>
              </div>
              <div>
                <h4 className="font-bold">
                  Demand Forecasting
                </h4>
                <p className="text-slate-500 text-sm max-w-[65ch]">
                  AI-driven insights to prevent stockouts and overstock
                  situations.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Problem / Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-red-50 p-8 rounded-xl border border-red-100">
          <h5 className="text-red-600 font-bold mb-4 uppercase text-xs tracking-wider">
            The Problem
          </h5>
          <p className="text-slate-700 font-medium">
            Siloed data between warehouses and distributors leading to lost
            sales and expiring stock.
          </p>
        </div>

        <div className="bg-green-50 p-8 rounded-xl border border-green-100">
          <h5 className="text-green-600 font-bold mb-4 uppercase text-xs tracking-wider">
            The Solution
          </h5>
          <p className="text-slate-700 font-medium">
            Unified cloud platform connecting every tier of your distribution
            network with mobile-first reporting.
          </p>
        </div>
      </div>
    </section>
  )
}

export default StockSales
