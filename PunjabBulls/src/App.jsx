import React, { useState, useEffect } from "react"; // Add useState and useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";


// Main App Component (extracted from the original return)
const MainApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <Notification />
          <Routes>
            {/* Public Routes */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/"
              element={
                <>
                  <Navigation />
                  <Home /> {/* Changed from Loader to Home */}
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/product/:id"
              element={
                <>
                  <Navbar />
                  <ProductDetail />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  <AboutPage />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <Navbar />
                  <Products />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <Contact />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/shipping"
              element={
                <>
                  <Navbar />
                  <ShippingPolicy />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/privacy"
              element={
                <>
                  <Navbar />
                  <Privacy />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
              path="/refund"
              element={
                <>
                  <Navbar />
                  <Refund />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
            <Route
                path="/terms"
                element={
                  <>
                    <Navbar />
                    <Terms />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
                <Route
                path="/search"
                element={
                  <>
                    <Navbar />
                    <Search />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />

            {/* Protected Routes (Authenticated Users) */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/cart"
                element={
                  <>
                    <Navbar />
                    <Cart />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <>
                    <Navbar />
                    <Wishlist />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/confirm-order"
                element={
                  <>
                    <Navbar />
                    <OrderConfirmation />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/my-account"
                element={
                  <>
                    <Navbar />
                    <MyAccount />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/thank-you"
                element={
                  <>
                    <Navbar />
                    <ThankYou />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <UserProfilePage />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
            </Route>

            {/* Admin Routes (Authenticated + Admin Role) */}
            <Route element={<AdminRoute />}>
              <Route
                path="/admin/dashboard"
                element={
                  <>
                    <Navbar />
                    <AdminDashboard />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <>
                    <Navbar />
                    <ProductManagement />
                    <InstagramButton />
                    <Footer />
                  </>
                }
              />
            </Route>

            {/* Catch-all Route */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <PageNotFound />
                  <InstagramButton />
                  <Footer />
                </>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </Provider>
  );
};


// Main App Component with Splash Screen
const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
  
    const splashShown = sessionStorage.getItem('vellor_splash_shown');
    return !splashShown; 
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('vellor_splash_shown', 'true');
      }, 5000);

      
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return <MainApp />;
};