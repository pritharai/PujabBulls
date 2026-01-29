import React from 'react'

const ProductNav = () => {
  return (
    <div className="sticky top-16 bg-white shadow-sm z-40">
      <div className="max-w-300 mx-auto px-4 overflow-x-auto">
        <div className="flex items-center gap-8 whitespace-nowrap">
          {[
            ["Dynamics 365", "#dynamics"],
            ["Stock & Sales", "#stock"],
            ["GST Automation", "#gst"],
            ["TCS Compliance", "#tcs"],
            ["Rice Industry ERP", "#rice"],
          ].map(([label, link]) => (
            <a
              key={link}
              href={link}
              className="py-4 text-sm font-bold text-slate-500 hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductNav