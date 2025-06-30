import { useEffect, useRef } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";

function Magnetic({
  children,
  angleX = 0.35,
  angleY = 0.35,
  className,
  ...rest
}) {
  const magnetic = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        magnetic.current.getBoundingClientRect();

      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * angleX);
      yTo(y * angleY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const el = magnetic.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [angleX, angleY]);

  return (
    <div ref={magnetic} className={className} {...rest}>
      {children}
    </div>
  );
}

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  angleX: PropTypes.number,
  angleY: PropTypes.number,
};

export default Magnetic;
