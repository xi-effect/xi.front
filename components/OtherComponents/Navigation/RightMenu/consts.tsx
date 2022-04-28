export const variantsCont = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const variantsChild = {
  open: {
    y: 0,
    opacity: 1,
    transition: {},
  },
  closed: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.2,
      y: { stiffness: 1000 },
    },
  },
};
