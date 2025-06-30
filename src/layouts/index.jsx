import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "./loader";
import Navbar from "./navbar";
import { useCursorInk } from "../hooks/useCursorInk";
import LenisScroll from "../hooks/useLenisScroll";
import { slideUp } from "./anim";

function Layout({ children }) {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canvasRef = useCursorInk(canvasSize);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 300);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      <motion.main
        variants={slideUp}
        initial="initial"
        animate="enter"
        className={`layout ${isLoading ? " loading" : ""}`}
      >
        <canvas
          ref={canvasRef}
          className="ink-canvas"
          width={canvasSize.width}
          height={canvasSize.height}
        />
        <LenisScroll />
        <Navbar />
        {children}
      </motion.main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
