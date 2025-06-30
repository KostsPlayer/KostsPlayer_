import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import Magnetic from "../../hooks/useMagnetic";
import { useParallaxScroll } from "../../hooks/useParallaxScroll";

function RoundedButton({
  children,
  backgroundColor = "#455CE9",
  activeParallax = false,
  axis = "y",
  speed = -0.08,
  angleX = 0.35,
  angleY = 0.35,
  ...rest
}) {
  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  const parallaxScrollRef = useRef(null);

  useParallaxScroll(activeParallax, parallaxScrollRef, { axis, speed });

  return (
    <div ref={parallaxScrollRef} className="rounded-button-wrapper">
      <Magnetic
        className="rounded-button"
        angleX={angleX}
        angleY={angleY}
        style={{ overflow: "hidden" }}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...rest}
      >
        {children}
        <div ref={circle} style={{ backgroundColor }} className="circle"></div>
      </Magnetic>
    </div>
  );
}

RoundedButton.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  activeParallax: PropTypes.bool,
  axis: PropTypes.oneOf(["x", "y"]),
  speed: PropTypes.number,
  angleX: PropTypes.number,
  angleY: PropTypes.number,
};

export default RoundedButton;
