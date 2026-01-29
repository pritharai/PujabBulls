import { useEffect, useRef, useState } from "react";
import "./styles/splashscreen.css";

export default function SplashScreen({ onFinish }) {
  const text = "PunjabBulls";
  const indexRef = useRef(0);
  const startedRef = useRef(false);

  const [letters, setLetters] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const interval = setInterval(() => {
      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 800);
        setTimeout(() => onFinish?.(), 1800);
        return;
      }

      setLetters((prev) => [...prev, text.charAt(indexRef.current)]);
      indexRef.current += 1;
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`splash ${done ? "fade-out" : ""}`}>
      <h1 className="brand">
        {letters.map((char, i) => (
          <span key={i} className="letter">
            {char}
          </span>
        ))}
        {!done && <span className="cursor" />}
      </h1>
    </div>
  );
}