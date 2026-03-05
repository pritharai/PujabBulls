import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("adminToken");
  //   setIsAdmin(!!token);
  // }, []);

  useEffect(() => {
  const checkToken = () => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);
  };

  // Check on mount
  checkToken();

  // Listen for custom "authChange" event
  window.addEventListener("authChange", checkToken);

  return () => window.removeEventListener("authChange", checkToken);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    navigate("/");
  };

  const navItems = [
    ["Home", "/"],
    ["Industries", "/industries"],
    ["Products", "/products"],
    ["About", "/about"],
    ["Contact", "/contact"],
    ["Privacy Policy", "/privacy-policy"],
    ["Blogs","/blogs"]
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f9fbf9]/90 backdrop-blur-md border-b border-[#e9f1eb]">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 text-[#101912]"
          onClick={() => setOpen(false)}
        >
          <img
            src="https://res.cloudinary.com/ducv9j3hj/image/upload/v1770456470/logo_ry6usn.png"
            alt="PunjabBulls Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navItems.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-[#101912]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* ADMIN LINKS */}
          {isAdmin && (
           
            <>
              <Link
                to="/admin/blogs"
                className="text-sm font-medium text-primary"
              >
                Manage Blogs
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden md:flex min-w-21 items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-md hover:bg-primary/90 transition-all"
        >
          Contact Us
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center size-10 rounded-lg border border-[#e9f1eb] text-[#101912]"
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#f9fbf9] border-t border-[#e9f1eb] px-6 py-6 space-y-6">
          <nav className="flex flex-col gap-5">
            {navItems.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-primary" : "text-[#101912]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {!isAdmin ? (
              <Link
                to="/admin/login"
                onClick={() => setOpen(false)}
                className="text-base font-medium text-primary"
              >
                Admin Login
              </Link>
            ) : (
              <>
                <Link
                  to="/admin/blogs"
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-primary"
                >
                  Manage Blogs
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-base font-medium text-red-600 text-left"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex justify-center items-center rounded-lg h-11 px-6 bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition-all"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
