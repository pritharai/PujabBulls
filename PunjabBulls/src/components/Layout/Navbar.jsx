import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { moreMenuSeoPages } from "../../seo/generatedPages";

const navItems = [
  ["Home", "/"],
  ["Industries", "/industries"],
  ["Products", "/products"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Privacy Policy", "/privacy-policy"],
  ["Blogs", "/blogs"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const [moreMenu, setMoreMenu] = useState(false);
  const [mobileAdminOpen, setMobileAdminOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const adminRef = useRef(null);
  const moreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("adminToken");
      setIsAdmin(!!token);
    };

    checkToken();
    window.addEventListener("authChange", checkToken);

    return () => window.removeEventListener("authChange", checkToken);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (adminRef.current && !adminRef.current.contains(event.target)) {
        setAdminMenu(false);
      }

      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setMobileAdminOpen(false);
      setMobileMoreOpen(false);
    }
  }, [open]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    setAdminMenu(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e9f1eb] bg-[#f9fbf9]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10">
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

        <nav className="hidden items-center gap-9 md:flex">
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

          {moreMenuSeoPages.length > 0 ? (
            <div
              ref={moreRef}
              className="relative"
              onMouseEnter={() => setMoreMenu(true)}
              onMouseLeave={() => setMoreMenu(false)}
            >
              <button
                onClick={() => setMoreMenu((prev) => !prev)}
                className="flex items-center gap-1 text-sm font-medium text-[#101912] transition-colors hover:text-primary"
              >
                More
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    moreMenu ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-72 origin-top rounded-lg border border-[#e9f1eb] bg-white py-2 shadow-lg transition-all duration-200 ${
                  moreMenu
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0"
                }`}
              >
                {moreMenuSeoPages.map((page) => (
                  <Link
                    key={page.path}
                    to={page.path}
                    className="block px-4 py-3 text-sm hover:bg-[#f6f8f6]"
                  >
                    <span className="block font-medium text-[#101912]">
                      {page.navLabel || page.heading}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-gray-500">
                      {page.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {isAdmin ? (
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
                className={`absolute right-0 top-full mt-2 w-44 origin-top rounded-lg border border-[#e9f1eb] bg-white py-2 shadow-lg transition-all duration-200 ${
                  adminMenu
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0"
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

                <div className="my-1 border-t" />

                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-[#f6f8f6]"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : null}
        </nav>

        <Link
          to="/contact"
          className="hidden h-10 min-w-21 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 md:flex"
        >
          Contact Us
        </Link>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-[#e9f1eb] text-[#101912] md:hidden"
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {open ? (
        <div className="max-h-[calc(100vh-73px)] overflow-y-auto border-t border-[#e9f1eb] bg-[#f9fbf9] px-6 py-6 md:hidden">
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

            {moreMenuSeoPages.length > 0 ? (
              <div className="rounded-2xl border border-[#e9f1eb] bg-white">
                <button
                  onClick={() => setMobileMoreOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-[#101912]"
                >
                  <span>More</span>
                  <span
                    className={`material-symbols-outlined text-[18px] transition-transform ${
                      mobileMoreOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {mobileMoreOpen ? (
                  <div className="space-y-1 border-t border-[#e9f1eb] px-2 py-2">
                    {moreMenuSeoPages.map((page) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-3 hover:bg-[#f6f8f6]"
                      >
                        <span className="block font-medium text-[#101912]">
                          {page.navLabel || page.heading}
                        </span>
                        <span className="mt-1 block text-sm leading-5 text-gray-500">
                          {page.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {isAdmin ? (
              <div className="rounded-2xl border border-[#e9f1eb] bg-white">
                <button
                  onClick={() => setMobileAdminOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-primary"
                >
                  <span>Admin</span>
                  <span
                    className={`material-symbols-outlined text-[18px] transition-transform ${
                      mobileAdminOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {mobileAdminOpen ? (
                  <div className="space-y-1 border-t border-[#e9f1eb] px-2 py-2">
                    <Link
                      to="/admin/blogs"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 hover:bg-[#f6f8f6]"
                    >
                      Manage Blogs
                    </Link>

                    <Link
                      to="/admin/manage-videos"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 hover:bg-[#f6f8f6]"
                    >
                      Manage Videos
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full rounded-xl px-3 py-3 text-left text-red-600 hover:bg-[#f6f8f6]"
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </nav>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-bold text-white shadow-md transition-all hover:bg-primary/90"
          >
            Contact Us
          </Link>
        </div>
      ) : null}
    </header>
  );
}
