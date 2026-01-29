"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function TrustedByCarousel() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 5,
      spacing: 32,
    },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 4 } },
      "(max-width: 768px)": { slides: { perView: 3 } },
      "(max-width: 480px)": { slides: { perView: 2 } },
    },

    created(slider) {
      slider.moveToIdx(5, true, { duration: 30000, easing: (t) => t });
    },
    updated(slider) {
      slider.moveToIdx(slider.track.details.abs + 5, true, {
        duration: 30000,
        easing: (t) => t,
      });
    },
  });

  const logos = [
    "/images/brands/dextra.png",
    "/images/brands/durian.png",
    "/images/brands/f&f.png",
    "/images/brands/igus.png",
    "/images/brands/kitty.jpeg",
    "/images/brands/kuber.jpeg",
    "/images/brands/stylam.jpeg",
    "/images/brands/veetee.png",
  ];

  return (
    <div className="mb-20">
      <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10">
        Trusted by industry leaders
      </p>

      <div
        ref={sliderRef}
        className="keen-slider opacity-70 hover:opacity-100 transition"
      >
        {logos.map((src, i) => (
          <div
            key={i}
            className="keen-slider__slide flex items-center justify-center"
          >
            <img
              src={src}
              alt="Company logo"
              className="h-14 w-auto grayscale hover:grayscale-0 transition duration-500 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}