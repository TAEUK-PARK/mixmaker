const addLeft = (source, setSource, setIsBoxPicked, index) => {
  const indexNumber = Number(index);
  setSource((prev) => {
    const result = prev.slice();
    result.splice(indexNumber, 0, source);

    return result;
  });
  setIsBoxPicked(false);

  return { location: "left", index: indexNumber };
};

export default addLeft;
