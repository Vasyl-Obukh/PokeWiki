module.exports = (elements, n) => {
  return [...Array(n)].map(() => elements[Math.floor(Math.random() * elements.length)]);
};