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
      url("/images/background/about-header.avif")
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
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-up">
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-600">
            A technology-focused organization with <strong>15+ years</strong> of
            experience delivering ERP, CRM, and enterprise-grade solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 animate-fade-up animate-delay-1">
          {[
            { icon: Cpu, label: "ERP & CRM" },
            { icon: Settings, label: "System Integration" },
            { icon: TrendingUp, label: "Business Growth" },
            { icon: ShieldCheck, label: "Reliable Delivery" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start"
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
            Excellence is built into every solution we deliver. Our initiatives
            also support over <strong>200 local families</strong> through
            sustainable partnerships.
          </p>
        </div>

        <div className="animate-fade-up animate-delay-1">
          <h2 className="text-3xl font-bold mb-4">How We Help You</h2>
          <p className="text-gray-600">
            We study your business, identify what sets you apart, and design
            practical, affordable, and proven technology solutions that move you
            forward.
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
