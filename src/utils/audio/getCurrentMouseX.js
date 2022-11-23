const getCurrentMouseX = (ev) => {
  const { clientX } = ev;
  const { left } = ev.target.getBoundingClientRect();

  return clientX - left;
};

export default getCurrentMouseX;
