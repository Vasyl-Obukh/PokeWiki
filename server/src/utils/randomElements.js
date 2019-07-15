module.exports = (elements, n) => {
  const elementsCopy = [...elements];
  const size = elements.length > n ? n : elements.length;
  return [...Array(size)].map(() => {
    const rand = Math.floor(Math.random() * elementsCopy.length);
    const result = elementsCopy[rand];
    elementsCopy.splice(rand, 1);
    return result;
  });
};