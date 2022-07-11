export const configSwipe = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
};

export const dragVariants = {
  // left: {
  //   x: -256,
  //   y: 0,
  // },
  center: {
    x: 0,
    y: 0,
  },
  right: {
    x: 336,
    y: 0,
  },
  bottom: {
    x: 0,
    y: 200,
  },
};

export const sidebarVariantsLeft = {
  visible: {
    x: 0,
  },
  hidden: {
    x: 200,
  },
};

export const sidebarVariantsRight = {
  visible: {
    x: 0,
  },
  hidden: {
    x: -200,
  },
};
