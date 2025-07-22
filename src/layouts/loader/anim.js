export const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export const slideDown = {
  initial: {
    top: 0,
  },
  exit: {
    top: "100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export const getCurveUp = (dimension) => {
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  } L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  console.log("initialPath", initialPath);
  console.log("targetPath", targetPath);

  return {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };
};

export const getCurveDown = (dimension) => {
  const offset = 300;

  // Path awal: datar, kurva di atas
  const initialPath = `M0 ${dimension.height} 
    L${dimension.width} ${dimension.height} 
    L${dimension.width} 0 
    Q${dimension.width / 2} ${-offset} 0 0 
    L0 ${dimension.height}`;

  // Path target: datar
  const targetPath = `M0 ${dimension.height} 
    L${dimension.width} ${dimension.height} 
    L${dimension.width} 0 
    Q${dimension.width / 2} 0 0 0 
    L0 ${dimension.height}`;

  return {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };
};
