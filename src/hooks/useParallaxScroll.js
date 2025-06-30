// hooks/useParallaxScrollAxis.js
import { useEffect } from "react";

export function useParallaxScroll(
  activeParallax = false,
  ref,
  { axis = "y", speed = 0.1 } = {}
) {
  useEffect(() => {
    if (!activeParallax || !ref?.current) return;

    const el = ref.current;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const value = scrollY * speed;

      el.style.transform =
        axis === "y"
          ? `translate3d(0, ${value}px, 0)`
          : `translate3d(${value}px, 0, 0)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeParallax, ref, axis, speed]);
}
