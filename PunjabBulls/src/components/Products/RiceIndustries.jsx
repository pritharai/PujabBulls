import React from "react";

const industries = [
  "Rice Millers",
  "Basmati Rice Exporters",
  "Rice Processing Plants",
  "Agro Commodity Traders",
  "Food Grain Distributors"
];

const RiceIndustries = () => {
  return (
    <section className="py-20 px-6 md:px-20">

      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-10">
          Who Uses Our Rice ERP?
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

          {industries.map((industry, index) => (
            <div
              key={index}
              className="px-6 py-3 border rounded-full text-sm hover:bg-primary hover:text-white transition"
            >
              {industry}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default RiceIndustries;