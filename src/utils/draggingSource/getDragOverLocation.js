const getDragOverLocation = (ev) => {
  const currentTargetWidth = ev.target.parentElement.clientWidth;
  const offsetLeft = ev.target.offsetParent.offsetLeft || ev.target.offsetLeft;
  const currentOffsetX = ev.clientX - offsetLeft;
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
