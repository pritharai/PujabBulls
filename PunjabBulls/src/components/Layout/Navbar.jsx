import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const adminRef = useRef(null);
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

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (adminRef.current && !adminRef.current.contains(event.target)) {
      setAdminMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
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
    ["Blogs", "/blogs"],
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
  <div
    ref={adminRef}
    className="relative"
    onMouseEnter={() => setAdminMenu(true)}
    onMouseLeave={() => setAdminMenu(false)}
  >
    <button
      onClick={() => setAdminMenu((prev) => !prev)}
      className="flex items-center gap-1 text-sm font-medium text-primary"
    >
      Admin

      <span
        className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
          adminMenu ? "rotate-180" : ""
        }`}
      >
        expand_more
      </span>
    </button>

    <div
      className={`dropdown-enter absolute top-full mt-2 right-0 w-44 bg-white border border-[#e9f1eb] rounded-lg shadow-lg py-2 transition-all duration-200 origin-top ${
        adminMenu
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible"
      }`}
    >
      <Link
        to="/admin/blogs"
        className="block px-4 py-2 text-sm hover:bg-[#f6f8f6]"
      >
        Manage Blogs
      </Link>

      <Link
        to="/admin/manage-videos"
        className="block px-4 py-2 text-sm hover:bg-[#f6f8f6]"
      >
        Manage Videos
      </Link>

      <div className="border-t my-1"></div>

      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[#f6f8f6]"
      >
        Logout
      </button>
    </div>
  </div>
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

            {isAdmin && (
  <div
    ref={adminRef}
    className="relative"
    onMouseEnter={() => setAdminMenu(true)}
    onMouseLeave={() => setAdminMenu(false)}
  >
    <button
      onClick={() => setAdminMenu((prev) => !prev)}
      className="flex items-center gap-1 text-sm font-medium text-primary"
    >
      Admin

      <span
        className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
          adminMenu ? "rotate-180" : ""
        }`}
      >
        expand_more
      </span>
    </button>

    <div
      className={`dropdown-enter absolute top-full mt-2 right-0 w-44 bg-white border border-[#e9f1eb] rounded-lg shadow-lg py-2 transition-all duration-200 origin-top ${
        adminMenu
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible"
      }`}
    >
      <Link
        to="/admin/blogs"
        className="block px-4 py-2 text-sm hover:bg-[#f6f8f6]"
      >
        Manage Blogs
      </Link>

      <Link
        to="/admin/videos"
        className="block px-4 py-2 text-sm hover:bg-[#f6f8f6]"
      >
        Manage Videos
      </Link>

      <div className="border-t my-1"></div>

      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[#f6f8f6]"
      >
        Logout
      </button>
    </div>
  </div>
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
