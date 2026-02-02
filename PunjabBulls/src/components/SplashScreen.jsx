import { useEffect, useState } from "react";
import "./styles/splashscreen.css";

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Logo fade in and scale animation happens via CSS
    // After 2.5 seconds, start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // After fade out completes, call onFinish
    const finishTimer = setTimeout(() => {
      onFinish?.();
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash ${fadeOut ? "fade-out" : ""}`}>
      <div className="splash-content">
        <div className="logo-container">
          <img 
            src="/logo.png" 
            alt="PunjabBulls" 
            className="splash-logo"
          />
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
      <div className="splash-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
}