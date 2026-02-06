import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background-light">
      <div className="px-4 md:px-10 lg:px-40 py-12 md:py-20 flex justify-center">
        <motion.div
          className="max-w-300 w-full"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              className="flex flex-col gap-6 flex-1 text-center lg:text-left"
              variants={container}
            >
              <div className="flex flex-col gap-4">
                <motion.span
                  className="text-primary font-bold tracking-wider text-sm uppercase"
                  variants={fadeUp}
                >
                  IT Consulting &amp; Solutions
                </motion.span>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[#101912]"
                  variants={fadeUp}
                >
                  Empowering Enterprise Excellence
                </motion.h1>

                <motion.h2
                  className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
                  variants={fadeUp}
                >
                  Transform your business with expert ERP, CRM, and Microsoft
                  Dynamics solutions tailored for growth.
                </motion.h2>
              </div>

              {/* BUTTONS */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                variants={fadeUp}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-all"
                >
                  Get Started
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center rounded-lg h-12 px-6 border border-[#d3e4d8] text-[#101912] text-base font-bold hover:bg-black/5 transition-all"
                >
                  View Solutions
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full flex-1"
              variants={imageReveal}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <div
                className="w-full h-full bg-no-repeat bg-center min-h-75 bg-contain shadow-2xl relative"
                style={{
                  backgroundImage: "url('/images/microsoft-business-central.png')",
                }}
                aria-label="Modern office representing enterprise growth"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent mix-blend-multiply pointer-events-none"></div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;