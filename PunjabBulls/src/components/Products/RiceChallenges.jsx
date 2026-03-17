import React from "react";

const challenges = [
  {
    title: "Inventory Loss",
    desc: "Lack of batch-wise stock tracking leads to frequent stock mismatch and loss."
  },
  {
    title: "Quality Monitoring",
    desc: "Manual processes make it difficult to track moisture, broken rice and yield."
  },
  {
    title: "Production Visibility",
    desc: "Rice mills struggle to monitor real-time milling output and BIN stock."
  },
  {
    title: "Export Compliance",
    desc: "Export documentation, inspection and compliance processes are complex."
  }
];

const RiceChallenges = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-background-light">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-12">
          Challenges Faced by Modern Rice Mills
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {challenges.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition animate-fade-up"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RiceChallenges;