import "./styles/hero.css";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
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

const imageFloat = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="hero">
      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* LEFT CONTENT */}
        <motion.div className="hero-content">
          <motion.span className="hero-eyebrow" variants={fadeUp}>
            IT CONSULTING & SOLUTIONS
          </motion.span>

          <motion.h1 className="hero-title" variants={fadeUp}>
            Empowering <br />
            Enterprise <br />
            Excellence
          </motion.h1>

          <motion.p className="hero-description" variants={fadeUp}>
            Transform your business with expert ERP, CRM, and Microsoft Dynamics
            solutions tailored for growth.
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>

            <motion.button
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Solutions
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="hero-image-wrapper"
          variants={imageFloat}
          whileHover={{ y: -12 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <img src="/images/hero.jpg" alt="Modern green office interior" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;