import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import PropTypes from "prop-types";

function Marquee({ text, className }) {
  const marqueeRef = useRef(null);
  const marqueeTextRef = useRef(null);
  const marqueeText2Ref = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(marqueeRef.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });

    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }

    gsap.set(marqueeTextRef.current, { xPercent: xPercent });
    gsap.set(marqueeText2Ref.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += direction * 0.03;
  };

  return (
    <div className={className}>
      <div className={`${className}-marquee`} ref={marqueeRef}>
        <span ref={marqueeTextRef}>{text}</span>
        <span ref={marqueeText2Ref}>{text}</span>
      </div>
    </div>
  );
}

Marquee.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Marquee;
