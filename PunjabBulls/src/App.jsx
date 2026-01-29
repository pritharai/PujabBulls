import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import Navigation from "./components/Navigation";
// import Footer from "./components/Footer";

// Pages
import Hero from "./components/Hero";
// import AboutPage from "./pages/AboutPage";
// import Products from "./pages/Products";
// import Contact from "./pages/Contact";
// import ShippingPolicy from "./pages/ShippingPolicy";
// import Privacy from "./pages/Privacy";
// import Refund from "./pages/Refund";
// import Terms from "./pages/Terms";
// import PageNotFound from "./pages/PageNotFound";


// ---------------- MAIN SITE ----------------
const MainApp = () => {
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/terms" element={<Terms />} /> */}

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
};


// ---------------- SPLASH WRAPPER ----------------
const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("punjabbulls_splash_shown");
  });

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem("punjabbulls_splash_shown", "true");
    }, 4000);

    return () => clearTimeout(timer);
  }, [showSplash]);

  if (showSplash) return <SplashScreen />;

  return <MainApp />;
};

export default App;