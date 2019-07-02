module.exports = (elements, n) => {
  return [...Array(n)].map(() => {
    let rand = Math.floor(Math.random() * elements.length);
    const result = elements[rand];
    elements.splice(rand, 1);
    return result;
  });
};