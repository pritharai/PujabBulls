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
    "https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395682/veetee_ulxbj0.png",
    "https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395681/stylam_rb1aq5.jpg",
    "https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395680/f_f_fn6ccw.png",
    "https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395680/kitty_jxwvlz.jpg",
    "https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395680/kuber_nt4rpm.jpg",
    "https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395679/igus_c7dp2s.png",
    "https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395679/dextra_ytmu3a.png",
    "https://res.cloudinary.com/ducv9j3hj/image/upload/v1770395679/durian_qqiwa2.png"
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