import { useState, Fragment, useRef, useCallback } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import SliderProject from "../../../components/sliderProject";
import RoundedButton from "../../../components/roundedButton";
import projectsData from "../../../data/projects.json";

function Project() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  const handleModal = useCallback(
    (active, index, e) => {
      setModal({
        active,
        index,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    },
    [setModal]
  );

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <>
      <div className="project" ref={containerRef}>
        <div className="note">Recent Work</div>
        <SliderProject modal={modal} projects={projectsData} />

        {projectsData.map((project, index) => {
          const isLast = index === projectsData.length - 1;
          return (
            <Fragment key={index}>
              <div
                onMouseEnter={(e) => handleModal(true, index, e)}
                onMouseLeave={(e) => handleModal(false, index, e)}
                className={`content ${isLast ? "last" : ""}`}
              >
                <h2>{project.title}</h2>
                <p>{project.role}</p>
              </div>
            </Fragment>
          );
        })}

        <div className="more">
          <RoundedButton>
            <span>More Work</span>
          </RoundedButton>
        </div>

        <motion.div style={{ height }} className="circle-container">
          <div className="circle"></div>
        </motion.div>
      </div>
    </>
  );
}

export default Project;
