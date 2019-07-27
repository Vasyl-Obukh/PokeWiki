"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SEARCH_CORRECTNESS = require('../config/config').SEARCH_CORRECTNESS;
require('string-compare');
function filterBySearch(data) {
    var value = data.value, _a = data.filters, filters = _a === void 0 ? {} : _a;
    var search = filters.search;
    if (!search || !value.length)
        return ({ value: value, filters: filters });
    return {
        value: value.filter(function (_) { return searchPokemons(_.name, search); }),
        filters: filters
    };
}
function filterByTypes(data) {
    var value = data.value, _a = data.filters, filters = _a === void 0 ? {} : _a;
    var types = filters.types;
    if (!types || !types.length || !value.length)
        return ({ value: value, filters: filters });
    return {
        value: value.filter(function (_) { return _.types.some(function (_) { return types.includes(_); }); }),
        filters: filters
    };
}
function filterByEvolutionLevels(data) {
    var value = data.value, _a = data.filters, filters = _a === void 0 ? {} : _a;
    var evoLevels = filters.evoLevels;
    if (!evoLevels || !evoLevels.length || !value.length)
        return ({ value: value, filters: filters });
    return {
        value: value.filter(function (_) { return evoLevels.includes(_.evoLevel); }),
        filters: filters
    };
}
// @ts-ignore
var searchPokemons = function (pokemonName, search) { return String.compare(pokemonName, search) > SEARCH_CORRECTNESS; };
var createPipeline = function () {
    var ops = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ops[_i] = arguments[_i];
    }
    return ops.reduce(function (a, b) { return function (_a) {
        var value = _a.value, filters = _a.filters;
        return b(a({ value: value, filters: filters }));
    }; });
};
module.exports = {
    filterBySearch: filterBySearch,
    filterByTypes: filterByTypes,
    searchPokemons: searchPokemons,
    filterByEvolutionLevels: filterByEvolutionLevels,
    createPipeline: createPipeline
};
//# sourceMappingURL=filters.js.map