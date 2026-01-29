import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout/Layout";
import SplashScreen from "./components/SplashScreen";

import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Solutions from "./Pages/Solutions";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/Privacy";

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("punjabbulls_splash_seen");
  });

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("punjabbulls_splash_seen", "true");
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
}

export default App;