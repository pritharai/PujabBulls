import React from 'react'
import { Link } from 'react-router-dom';

const ProductHero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 px-4 md:px-20 lg:px-40">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-linear-to-tr from-primary to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 max-w-4xl">
          Enterprise ERP &amp; Compliance Solutions Built for{" "}
          <span className="text-primary">Indian Businesses</span>
        </h1>

        <p className="text-lg text-slate-600 mb-10 max-w-[65ch]">
          Empower your enterprise with scalable, GST-compliant, and
          industry-specific ERP solutions designed for the Indian market.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="flex hover:cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5">
            Book demo
          </Link>

          <Link to="/contact" className="flex hover:cursor-pointer items-center justify-center rounded-lg h-12 px-6 border border-[#d3e4d8]  text-[#101912] text-base font-bold hover:bg-black/5 transition-all">
            Talk to Consultant
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductHero
