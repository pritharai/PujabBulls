import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout/Layout";
import SplashScreen from "./components/SplashScreen";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./Pages/Admin/Login";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminBlogs from "./Pages/Admin/AdminBlogs";

import Home from "./Pages/Home";
import Industries from "./Pages/Industries";
import Privacy from "./Pages/Privacy";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/Privacy";
// import Chatbot from "./components/Chatbot/Chatbot";
import ScrollToTop from "./components/Layout/ScrollToTop";
import Blog        from './Pages/Blog'
import Post        from './Pages/Post'
import Admin       from './Pages/Admin'
import AdminLogin  from './Pages/AdminLogin'

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
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                < AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                < AdminBlogs />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
      {/* <Chatbot /> */}
    </>
  );
}

export default App;