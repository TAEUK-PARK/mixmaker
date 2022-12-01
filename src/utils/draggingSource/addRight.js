const addRight = (source, setSource, setIsBoxPicked, index) => {
  setSource((prev) => {
    const result = prev.slice();
    result.splice(index + 1, 0, source);

    return result;
  });
  setIsBoxPicked(false);
};

export default addRight;
