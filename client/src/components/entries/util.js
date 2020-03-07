import { ENTRY_HEIGHT } from "../../constants";

export const springHandler = (
  order,
  down,
  touch,
  doubleTouch,
  originalIndex,
  curIndex,
  y
) => index => {
  if (!touch) {
    return down && index === originalIndex
      ? {
          y: curIndex * ENTRY_HEIGHT + y,
          immediate: n => n === "y" || n === "zIndex"
        }
      : {
          y: order.indexOf(index) * ENTRY_HEIGHT,
          immediate: false
        };
  }
  if (touch && doubleTouch) {
    return down && index === originalIndex
      ? {
          y: curIndex * ENTRY_HEIGHT + y,
          immediate: n => n === "y" || n === "zIndex"
        }
      : {
          y: order.indexOf(index) * ENTRY_HEIGHT,
          immediate: false
        };
  }
};

export const calculatePositionsAfterDeletion = (entries, id) => {
  const deletedPosition = entries.find(entry => entry.id === id).position;
  return entries
    .filter(entry => entry.position !== deletedPosition)
    .map(entry => {
      if (entry.position < deletedPosition) {
        return { ...entry };
      } else {
        return { ...entry, position: +(entry.position - 1) };
      }
    });
};

export const isDoubleTouch = latestTouch => {
  let now = 0;
  let timesince = 0;
  if (latestTouch) {
    now = new Date().getTime();
    timesince = now - latestTouch;
  }
  if (timesince < 1000 && timesince > 0) {
    return [true, new Date().getTime()];
  } else {
    return [false, new Date().getTime()];
  }
};
