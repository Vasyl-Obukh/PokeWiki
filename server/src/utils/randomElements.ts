const getArrayOfRandomElements = <T>(elements: Array<T>, n: number): Array<T> => {
  const elementsCopy: Array<T> = [...elements];
  const size: number = elements.length > n ? n : elements.length;
  return  Array(size).fill(undefined).map(() => {
    const rand: number = Math.floor(Math.random() * elementsCopy.length);
    const result: T = elementsCopy[rand];
    elementsCopy.splice(rand, 1);
    return result;
  });
};

module.exports = getArrayOfRandomElements;