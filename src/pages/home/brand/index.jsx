// import { useRef } from "react";

import BounceDivider from "../../../components/bounceDivider";
import { usePhraseSlideUp } from "../../../hooks/usePhraseSlideUp";
import PhraseSlideUp from "../../../components/phraseSlideUp/PhraseSlideUp";
import RoundedButton from "../../../components/roundedButton";

function Brand() {
  const phraseTitle = `Creating Impactful Digital Experiences through Freelance Full-Stack Development and Data Insight`;
  const phraseSubtitle1 = `Applying Data-Driven Thinking to Craft Tailored Digital Solutions for Clients Across Industries`;
  const phraseSubtitle2 = `Combining Freelance Agility and Full-Stack Expertise to Build Scalable, User-Focused Applications`;

  const {
    containerRef: containerTitleRef,
    addToRefs: addToTitleRefs,
    phraseArray: phraseTitleArray,
  } = usePhraseSlideUp({
    phrase: phraseTitle,
    duration: 0.9,
    delayMultiplier: 0.05,
    ease: "cubic-bezier(0.76, 0, 0.24, 1)",
  });

  const {
    containerRef: containerSubtitle1Ref,
    addToRefs: addToSubtitle1Refs,
    phraseArray: phraseSubtitle1Array,
  } = usePhraseSlideUp({
    phrase: phraseSubtitle1,
    duration: 0.7,
    delayMultiplier: 0.05,
    ease: "cubic-bezier(0.76, 0, 0.24, 1)",
  });

  const {
    containerRef: containerSubtitle2Ref,
    addToRefs: addToSubtitle2Refs,
    phraseArray: phraseSubtitle2Array,
  } = usePhraseSlideUp({
    phrase: phraseSubtitle2,
    duration: 0.7,
    delayMultiplier: 0.05,
    ease: "cubic-bezier(0.76, 0, 0.24, 1)",
  });

  return (
    <div className="brand">
      <BounceDivider />

      <PhraseSlideUp
        phraseArray={phraseTitleArray}
        addToRefs={addToTitleRefs}
        containerRef={containerTitleRef}
        className="brand-title"
      />

      <div className="brand-subtitle">
        <PhraseSlideUp
          phraseArray={phraseSubtitle1Array}
          addToRefs={addToSubtitle1Refs}
          containerRef={containerSubtitle1Ref}
          className="text"
        />

        <PhraseSlideUp
          phraseArray={phraseSubtitle2Array}
          addToRefs={addToSubtitle2Refs}
          containerRef={containerSubtitle2Ref}
          className="text"
        />
      </div>

      <RoundedButton activeParallax={true}>
        <span>About Me</span>
      </RoundedButton>
    </div>
  );
}

export default Brand;
