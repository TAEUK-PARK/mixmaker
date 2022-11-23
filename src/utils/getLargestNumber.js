const getLargestNumber = (...args) => {
  const numbersArray = [...args];
  numbersArray.sort((a, b) => a - b);

  return numbersArray.at(-1);
};

export default getLargestNumber;
