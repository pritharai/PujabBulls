import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Punjab Bulls Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-yellow-600">Home</Link></li>
          <li><Link to="/about" className="hover:text-yellow-600">About Us</Link></li>
          <li><Link to="/product" className="hover:text-yellow-600">Product</Link></li>
          <li><Link to="/industries" className="hover:text-yellow-600">Industries</Link></li>
          <li><Link to="/privacy" className="hover:text-yellow-600">Privacy</Link></li>
          <li>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4 text-gray-700 font-medium">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link to="/product" onClick={() => setIsOpen(false)}>Product</Link></li>
          <li><Link to="/industries" onClick={() => setIsOpen(false)}>Industries</Link></li>
          <li><Link to="/privacy" onClick={() => setIsOpen(false)}>Privacy</Link></li>
          <li>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-block text-center px-4 py-2 rounded-full bg-yellow-500 text-white"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
