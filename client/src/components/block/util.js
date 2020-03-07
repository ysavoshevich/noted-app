export const getBlockStyle = (wh, xy, z, position, small) => {
  return {
    position: "absolute",
    zIndex: z.interpolate(z => z),
    width: wh.interpolate(w => `${w}vw`),
    height: wh.interpolate((_, h) => `${h}%`),
    transform: xy.interpolate((x, y) => `translate(${x}%, ${y}%)`),
    top: `${getPosition(position, small)[0]}%`,
    left: `${getPosition(position, small)[1]}%`
  };
};

export const getPosition = (position, small) => {
  switch (position) {
    case 0:
      return [0, 0];
    case 1:
      return small ? [25, 0] : [0, 50];
    case 2:
      return small ? [50, 0] : [50, 0];
    case 3:
      return small ? [75, 0] : [50, 50];
    default:
      return [];
  }
};

export const getTransform = (position, small) => {
  switch (position) {
    case 0:
      return [0, 0];
    case 1:
      return small ? [0, -25] : [-50, 0];
    case 2:
      return small ? [0, -50] : [0, -50];
    case 3:
      return small ? [0, -75] : [-50, -50];
    default:
      return [];
  }
};

export const getIconClassname = title => {
  switch (title) {
    case "books":
      return "fas fa-book fa-3x";
    case "music":
      return "fas fa-music fa-3x";
    case "movies":
      return "fas fa-video fa-3x";
    case "articles":
      return "fas fa-newspaper fa-3x";
    default:
      return "error";
  }
};
