import React from "react";

const RiceProcessFlow = () => {
  const steps = [
    {
      title: "Sauda",
      subtitle: "Booking & Approval",
      icon: "receipt_long",
    },
    {
      title: "Gate Entry",
      subtitle: "Weighment & Inward",
      icon: "local_shipping",
    },
    {
      title: "QC",
      subtitle: "Moisture & Quality",
      icon: "science",
    },
    {
      title: "Production",
      subtitle: "Processing & Yield",
      icon: "factory",
    },
    {
      title: "BIN",
      subtitle: "Storage & Pallet",
      icon: "inventory_2",
    },
    {
      title: "Export",
      subtitle: "Dispatch & Invoice",
      icon: "flight_takeoff",
    },
  ];

  return (
    <div className="w-full">
      {/* Desktop / Tablet */}
      <div className="hidden md:flex items-center justify-between gap-4 my-16">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 shadow-sm">
                <span className="material-symbols-outlined text-2xl">
                  {step.icon}
                </span>
              </div>

              <p className="font-semibold text-sm">{step.title}</p>
              <p className="text-xs text-slate-500">
                {step.subtitle}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <span className="material-symbols-outlined text-slate-400 text-xl">
                arrow_forward
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden flex-col items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center gap-4 w-full max-w-sm bg-white/70 rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">
                  {step.icon}
                </span>
              </div>

              <div>
                <p className="font-semibold text-sm">
                  {step.title}
                </p>
                <p className="text-xs text-slate-500">
                  {step.subtitle}
                </p>
              </div>
            </div>

            {index !== steps.length - 1 && (
              <span className="material-symbols-outlined text-slate-400 my-2">
                arrow_downward
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RiceProcessFlow;