import React from "react";

const RiceCTA = () => {
  return (
    <section className="py-24 bg-secondary text-white text-center px-6">

      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Digitize Your Rice Mill?
      </h2>

      <p className="max-w-xl mx-auto mb-8">
        See how PunjabBulls ERP can streamline rice mill operations,
        improve yield visibility and simplify export compliance.
      </p>

      <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:opacity-90 cursor-pointer" onClick={() => (window.location.href = '/contact')}>
        Schedule ERP Demo
      </button>

    </section>
  );
};

export default RiceCTA;