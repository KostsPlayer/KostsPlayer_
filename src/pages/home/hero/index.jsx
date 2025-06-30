import { useState, useCallback, Fragment } from "react";
import Marquee from "../../../components/marquee";
import hero from "../../../data/hero.json";

function Hero() {
  const [indexProject, setIndexProject] = useState(1);

  const handleNextImage = useCallback(() => {
    const nextIndex = (indexProject + 1) % hero.length;

    setIndexProject(nextIndex);
  }, [indexProject]);

  const handlePrevImage = useCallback(() => {
    const prevIndex = (indexProject - 1 + hero.length) % hero.length;

    setIndexProject(prevIndex);
  }, [indexProject]);

  return (
    <div className="hero">
      <div className="hero-content" onClick={handlePrevImage}>
        <div className="content-text">
          Full-stack developer, freelancer, and data scientist eager to grow and deepen knowledge.
        </div>
      </div>
      <div className="hero-image">  
        {hero.map((data, idx) => {
          return (
            <Fragment key={data.id}>
              <img
                src={`hero/${data.image}`}
                alt={`${data.name}'s image`}
                className={`${idx === indexProject ? "active" : ""}`}
              />
            </Fragment>
          );
        })}
      </div>
      <div className="hero-content" onClick={handleNextImage}></div>
      <Marquee className="hero-marquee" text="kostsplayer." />
    </div>
  );
}

export default Hero;
