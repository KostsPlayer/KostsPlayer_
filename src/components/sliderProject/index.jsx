import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { motion } from "framer-motion";
import { scaleAnimation } from "./anim";

function SliderProject({ modal, projects }) {
  const { active, index } = modal;

  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const rafId = useRef(null);

  const xMoveContainer = useRef(null);
  const yMoveContainer = useRef(null);
  const xMoveCursor = useRef(null);
  const yMoveCursor = useRef(null);
  const xMoveCursorLabel = useRef(null);
  const yMoveCursorLabel = useRef(null);

  // GSAP initializer
  useEffect(() => {
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const clientPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      clientPos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP loop pakai requestAnimationFrame
  useEffect(() => {
    const updatePosition = () => {
      const { x, y } = clientPos.current;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      const finalX = x + scrollX;
      const finalY = y + scrollY;

      xMoveContainer.current?.(finalX);
      yMoveContainer.current?.(finalY);
      xMoveCursor.current?.(finalX);
      yMoveCursor.current?.(finalY);
      xMoveCursorLabel.current?.(finalX);
      yMoveCursorLabel.current?.(finalY);

      rafId.current = requestAnimationFrame(updatePosition);
    };

    if (active) {
      rafId.current = requestAnimationFrame(updatePosition);
    }

    return () => cancelAnimationFrame(rafId.current);
  }, [active]);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="modal-container"
      >
        <div style={{ top: index * -100 + "%" }} className="modal-slider">
          {projects.map((project, i) => (
            <div
              className="modal"
              style={{ backgroundColor: project.color }}
              key={`modal_${i}`}
            >
              <img
                src={`/projects/${project.src}`}
                width={300}
                height={0}
                alt={project.title}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        className="cursor"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      />
      <motion.div
        ref={cursorLabel}
        className="cursor-label"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
}

SliderProject.propTypes = {
  modal: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    clientX: PropTypes.number,
    clientY: PropTypes.number,
  }).isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SliderProject;
