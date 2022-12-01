const addLeft = (source, setSource, setIsBoxPicked, index) => {
  setSource((prev) => {
    const result = prev.slice();
    result.splice(index, 0, source);

    return result;
  });
  setIsBoxPicked(false);
};

export default addLeft;
