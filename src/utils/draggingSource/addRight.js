const addRight = (source, setSource, setIsBoxPicked, index) => {
  const indexNumber = Number(index) + 1;

  setSource((prev) => {
    const result = prev.slice();
    result.splice(indexNumber, 0, source);

    return result;
  });
  setIsBoxPicked(false);

  return { location: "right", index: indexNumber };
};

export default addRight;
