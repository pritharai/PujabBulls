import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // no smooth – avoids weird UX on nav
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
