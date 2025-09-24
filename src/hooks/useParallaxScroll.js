// hooks/useParallaxScroll.js
import { useEffect } from "react";

export function useParallaxScroll(
  activeParallax = false,
  ref,
  { axis = "y", speed = 0.1 } = {}
) {
  useEffect(() => {
    if (!activeParallax || !ref?.current) return;

    const el = ref.current;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const value = scrollY * speed;

          el.style.transform =
            axis === "y"
              ? `translate3d(0, ${value}px, 0)`
              : axis === "x"
              ? `translate3d(${value}px, 0, 0)`
              : "";

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeParallax, axis, speed, ref]);
}
