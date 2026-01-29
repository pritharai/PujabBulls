import { useEffect, useState } from "react";
import "./styles/splashscreen.css";

export default function SplashScreen({ onFinish }) {
  const text = "PunjabBulls";
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;

      if (index === text.length) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 800);
        setTimeout(() => onFinish?.(), 1800);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`splash ${done ? "fade-out" : ""}`}>
      <h1 className="brand">
        {displayedText}
        <span className="cursor" />
      </h1>
    </div>
  );
}