const getSmallestNumber = (...args) => {
  const numbersArray = [...args];
  numbersArray.sort((a, b) => a - b);

  return numbersArray[0];
};

export default getSmallestNumber;
