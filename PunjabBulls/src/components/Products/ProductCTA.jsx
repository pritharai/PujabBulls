import React from 'react'

const ProductCTA = () => {
  return (
    <section className="py-20 bg-dark-olive text-white px-4 md:px-20 lg:px-40 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to modernize your operations?
        </h2>

        <p className="text-slate-300 mb-10 text-lg">
          Join 500+ Indian enterprises that have simplified their compliance and
          boosted productivity with Punjabbulls Technology.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-base cursor-pointer transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0">
            Schedule a Live Demo
          </button>

          <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductCTA
