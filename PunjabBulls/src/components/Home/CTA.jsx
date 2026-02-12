import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-secondary text-white">
      <div className="px-4 md:px-10 flex flex-col items-center text-center max-w-4xl mx-auto">
  
  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
    Ready to streamline and scale your operations?
  </h2>

  <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
    Let’s discuss how our ERP, CRM, and Microsoft Dynamics solutions can
    simplify processes, improve visibility, and accelerate growth.
  </p>

  <Link
    to="/contact"
    className="flex items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
  >
    Schedule a Consultation
  </Link>

</div>

    </section>
  );
};

export default CTA;
