import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideDown, slideUp, getCurveUp, getCurveDown } from "./anim";

function Loader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const curve = getCurveUp(dimension);

  return (
    <motion.div
      variants={slideUp }
      initial="initial"
      exit="exit"
      className="loader"
    >
      {dimension.width > 0 && (
        <>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              animate="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}

export default Loader;
