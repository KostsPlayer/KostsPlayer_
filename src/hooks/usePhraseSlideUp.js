import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "framer-motion";

export const usePhraseSlideUp = ({
  phrase,
  duration = 0.8,
  stagger = 0.02,
  ease = "cubic-bezier(0.76, 0, 0.24, 1)",
} = {}) => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  wordsRef.current = [];

  const addToRefs = (el) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  const isInView = useInView(containerRef, {
    once: false, // supaya bisa trigger lagi saat keluar-masuk viewport
    amount: 0.5, // 50% visible baru trigger
  });

  const scrollDirection = useRef("down");
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      scrollDirection.current = current > lastScrollY.current ? "down" : "up";
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isInView && scrollDirection.current === "down") {
      gsap.to(wordsRef.current, {
        y: "0%",
        duration,
        stagger: stagger,
        ease,
      });
    }
    if (!isInView && scrollDirection.current === "up") {
      // reset position jika mau
      gsap.set(wordsRef.current, { y: "100%" });
    }
  }, [isInView, duration, stagger, ease]);

  return {
    containerRef,
    addToRefs,
    phraseArray: phrase.split(" "),
  };
};
