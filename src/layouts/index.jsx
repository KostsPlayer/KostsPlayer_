import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "./loader";
import Navbar from "./navbar";
import Footer from "./footer/Footer";
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

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    document.body.style.cursor = "wait";

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 300); // waktu loader tampil

    return () => clearTimeout(timeout); // bersihkan timeout saat pindah halaman
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>

      <motion.main
        key={location.pathname}
        variants={slideUp}
        initial="initial"
        animate="enter"
        className="layout"
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
        <Footer />
      </motion.main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
