const getFileType = (type) => {
  if (!type.includes("/")) return null;

  let sliceIndex = 0;

  while (type[sliceIndex] !== "/") {
    sliceIndex += 1;
  }

  return type.slice(0, sliceIndex);
};

export default getFileType;
