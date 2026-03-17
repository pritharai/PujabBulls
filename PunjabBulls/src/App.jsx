import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./components/Layout/Layout";
import SplashScreen from "./components/SplashScreen";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./Pages/Admin/Login";
import AdminBlogs from "./Pages/Admin/AdminBlogs";
import CreateBlog from "./Pages/Admin/CreateBlog";
import EditBlog from "./Pages/Admin/EditBlog";
import ImageAuditLogs from "./Pages/Admin/ImageAuditLogs";

import Home from "./Pages/Home";
import Industries from "./Pages/Industries";
import Privacy from "./Pages/Privacy";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PrivacyPolicy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
// import Chatbot from "./components/Chatbot/Chatbot";
import ScrollToTop from "./components/Layout/ScrollToTop";
import Blogs from "./Pages/Blogs";
import BlogDetail from "./Pages/BlogDetail";
import WhatIsBusinessCentral from "./Pages/WhatIsBusinessCentral";
import UploadVideo from "./Pages/Admin/VideoUpload";
import ManageVideos from "./Pages/Admin/ManageVideos";
import NotFound from "./Pages/NotFound";
import ERPForRice from "./Pages/ERPForRice";

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const isPrerenderedRoute = Boolean(
      document.querySelector('meta[name="prerendered-route"]')
    );

    if (isPrerenderedRoute) {
      sessionStorage.setItem("punjabbulls_splash_seen", "true");
      return false;
    }

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
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/upload-video"
            element={
              <ProtectedRoute>
                <UploadVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-videos"
            element={
              <ProtectedRoute>
                <ManageVideos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/image-audit-logs"
            element={
              <ProtectedRoute>
                <ImageAuditLogs />
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
          <Route path="/terms" element={<Terms />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/best-erp-for-rice-milling-industry" element={<ERPForRice />} />
          <Route
            path="/about/what-is-business-central"
            element={<WhatIsBusinessCentral />}
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* <Chatbot /> */}
    </>
  );
}

export default App;
