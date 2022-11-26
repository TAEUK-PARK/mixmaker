const addNext = (source, setSource, setIsBoxPicked) => {
  setSource((prev) => {
    const result = prev.slice();
    result.push(source);

    return result;
  });
  setIsBoxPicked(false);
};

export default addNext;
