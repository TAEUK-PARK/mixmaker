const getDragOverLocation = (ev) => {
  const currentTargetWidth = ev.target.parentNode.clientWidth;
  const currentOffsetX = ev.clientX - ev.target.offsetLeft;
  const maximumSideRange = Math.min(currentTargetWidth / 3, 80);

  let result = "middle";

  if (currentOffsetX < maximumSideRange) {
    result = "left";
  }

  if (currentOffsetX >= currentTargetWidth - maximumSideRange) {
    result = "right";
  }

  return result;
};

export default getDragOverLocation;
