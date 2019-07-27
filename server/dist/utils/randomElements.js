var getArrayOfRandomElements = function (elements, n) {
    var elementsCopy = elements.slice();
    var size = elements.length > n ? n : elements.length;
    return Array(size).fill(undefined).map(function () {
        var rand = Math.floor(Math.random() * elementsCopy.length);
        var result = elementsCopy[rand];
        elementsCopy.splice(rand, 1);
        return result;
    });
};
module.exports = getArrayOfRandomElements;
//# sourceMappingURL=randomElements.js.map