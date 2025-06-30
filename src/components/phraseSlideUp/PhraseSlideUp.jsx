import PropTypes from "prop-types";

function PhraseSlideUp({ phraseArray, addToRefs, containerRef, className }) {
  return (
    <div className={className} ref={containerRef}>
      {phraseArray.map((word, index) => (
        <span key={index} className="mask">
          <span
            ref={addToRefs}
            style={{
              transform: "translateY(100%)",
              display: "inline-block",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}

PhraseSlideUp.propTypes = {
  phraseArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  addToRefs: PropTypes.func.isRequired,
  containerRef: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default PhraseSlideUp;
