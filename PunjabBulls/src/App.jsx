import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/Layout/ScrollToTop";

import Home from "./Pages/Home";
import Industries from "./Pages/Industries";
import Privacy from "./Pages/Privacy";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/Privacy";

function App() {
  return (
    <>
      <ScrollToTop />

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
    </>
  );
}

export default App;
