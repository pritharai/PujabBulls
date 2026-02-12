import React from 'react'

const ProductNav = () => {
  return (
    <div className="sticky top-16 bg-white shadow-sm z-40">
      <div className="max-w-300 mx-auto px-4 overflow-x-auto">
        <div className="flex items-center gap-8 whitespace-nowrap">
          {[
            ["Dynamics 365 Business Central", "#dynamics"],
            ["Stock & Sales", "#stock"],
            ["Rice Industry ERP", "#rice"],
            ["GST Automation", "#gst"],
            // ["TCS Compliance", "#tcs"],
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