import { useEffect, useState } from "react";

const sections = [
  {
    id: "retail",
    label: "Retail",
    icon: "shopping_basket",
  },
  {
    id: "distribution",
    label: "Distribution",
    icon: "local_shipping",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: "factory",
  },
];

const IndustrySubnav = () => {
  const [active, setActive] = useState("retail");

  // Detect section in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-y border-[#e9f1eb]">

      <div className="max-w-7xl mx-auto px-6 lg:px-20">

        <div className="flex justify-center md:justify-start gap-8 md:gap-12 overflow-x-auto scrollbar-hide">

          {sections.map((item) => {
            const isActive = active === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`
                  py-5 text-sm font-bold flex items-center gap-2 whitespace-nowrap
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-primary"
                  }
                `}
              >
                <span className="material-symbols-outlined text-lg">
                  {item.icon}
                </span>
                {item.label}
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default IndustrySubnav;
