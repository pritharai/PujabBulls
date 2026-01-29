import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout/Layout";
import SplashScreen from "./components/SplashScreen";

import Home from "./Pages/Home";
import Industries from "./Pages/Industries";
import Privacy from "./Pages/Privacy";
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
        <Route path="/industries" element={<Industries />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  );
}

export default App;