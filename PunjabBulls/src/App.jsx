import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Solutions from "./Pages/Solutions";
import Process from "./Pages/Process";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";

function App() {
  return (
    <Routes>
      {/* Layout Route */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/process" element={<Process />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
