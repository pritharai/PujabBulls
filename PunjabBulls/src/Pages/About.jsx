import {
  Building2,
  Cpu,
  Settings,
  TrendingUp,
  ShieldCheck,
  Users,
} from "lucide-react";
import "../Styles/about.css";

export default function AboutUs() {
  return (
    <main className="bg-[var(--color-background-light)] text-[var(--color-secondary)]">
      {/* HERO */}
     {/* HERO */}
<section
  className="py-32 text-center"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(19, 31, 23, 0.65),
        rgba(19, 31, 23, 0.65)
      ),
      url("https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395678/about-header_ule0hd.avif")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="max-w-7xl mx-auto px-6">
    <h1 className="text-4xl md:text-5xl font-extrabold text-white animate-fade-up">
      Innovation Meets Execution
    </h1>
    <p className="mt-6 max-w-2xl mx-auto text-gray-200 text-lg animate-fade-up animate-delay-1">
      We design intelligent digital systems that help businesses adapt,
      scale, and lead with confidence.
    </p>
  </div>
</section>


      {/* WHO WE ARE */}
      {/* WHO WE ARE */}
<section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
  
  {/* LEFT CONTENT */}
  <div className="animate-fade-up">
    <h2 className="text-3xl font-bold mb-6">Who We Are</h2>

    <p className="text-gray-600 mb-6">
      We are a technology-driven consulting firm with over{" "}
      <strong>15+ years of industry experience</strong> delivering
      enterprise-grade ERP, CRM, and digital transformation solutions.
      Our expertise lies in aligning complex business processes with
      intelligent, scalable systems.
    </p>

    <p className="text-gray-600 mb-8">
      From strategy to execution, we partner with organizations to
      modernize operations, improve visibility, and create long-term
      operational excellence through trusted Microsoft technologies.
    </p>

    {/* MINI STATS */}
    <div className="grid grid-cols-3 gap-6 text-center md:text-left">
      <div>
        <h3 className="text-2xl font-bold text-[var(--color-primary)]">15+</h3>
        <p className="text-sm text-gray-500">Years Experience</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-[var(--color-primary)]">200+</h3>
        <p className="text-sm text-gray-500">Projects Delivered</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-[var(--color-primary)]">100%</h3>
        <p className="text-sm text-gray-500">Client Commitment</p>
      </div>
    </div>
  </div>

  {/* RIGHT ICON GRID */}
  <div className="grid grid-cols-2 gap-6 animate-fade-up animate-delay-1">
    {[
      { icon: Cpu, label: "ERP & CRM" },
      { icon: Settings, label: "System Integration" },
      { icon: TrendingUp, label: "Business Growth" },
      { icon: ShieldCheck, label: "Reliable Delivery" },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start hover:shadow-md transition-all duration-300"
      >
        <item.icon className="w-8 h-8 text-[var(--color-primary)] mb-3" />
        <p className="font-medium">{item.label}</p>
      </div>
    ))}
  </div>

</section>


      {/* WHAT WE DO */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold animate-fade-up">What We Do</h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-600 animate-fade-up animate-delay-1">
            We align technology with business strategy to create scalable,
            efficient, and future-ready systems.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: Building2,
                title: "Enterprise Solutions",
                desc: "ERP and CRM systems tailored to your operations.",
              },
              {
                icon: Users,
                title: "Consulting & Strategy",
                desc: "Technology decisions guided by business insight.",
              },
              {
                icon: Cpu,
                title: "Digital Transformation",
                desc: "Modern platforms built to evolve with you.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[var(--color-background-light)] animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <item.icon className="w-7 h-7 text-[var(--color-primary)] mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY & IMPACT */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="bg-[var(--color-primary)] text-white rounded-xl p-10 animate-fade-up">
  <h2 className="text-2xl font-bold mb-4">Guaranteed Quality</h2>
  <p className="opacity-90">
    Excellence is embedded into every solution we deliver. From strategic
    planning to seamless implementation, we ensure reliability,
    scalability, and long-term performance for every enterprise we serve.
  </p>
</div>


        <div className="animate-fade-up animate-delay-1">
  <h2 className="text-3xl font-bold mb-4">How We Help You</h2>
  <p className="text-gray-600">
    We study your business, identify what sets you apart, and design
    practical, affordable, and proven technology solutions that move you
    forward. Our focus is on building systems that scale with your growth
    and adapt to your evolving business needs.
  </p>
</div>

      </section>

      {/* FOOTER LINE */}
      <section className="text-center py-16 border-t border-[var(--color-accent-gray)]">
        <p className="text-lg font-medium">
          Intelligent technology. Thoughtful execution.
        </p>
      </section>
    </main>
  );
}
