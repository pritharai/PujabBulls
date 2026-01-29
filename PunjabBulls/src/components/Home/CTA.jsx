import React from "react";

const CTA = () => {
  return (
    <section className="py-24 bg-secondary text-white">
      <div className="px-4 md:px-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
          Ready to optimize your workflow?
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
          Get a comprehensive audit of your current IT infrastructure and
          discover how we can take your enterprise to the next level.
        </p>

        <button className="flex items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105">
          Get a Free Audit
        </button>
      </div>
    </section>
  );
};

export default CTA;
