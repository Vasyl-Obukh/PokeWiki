var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var getEntityFullData = function (_) { return (__assign({}, getEntityData(_), { baseExperience: _.base_experience, height: _.height, weight: _.weight, stats: _.stats ? _.stats.map(function (_) { return ({ base: _.base_stat, name: _.stat.name }); }) : [] })); };
var getEntityData = function (_) { return ({
    name: _.name,
    id: normalizeId(_.id),
    thumb: _.sprites ? _.sprites.front_default : '',
    abilities: _.abilities ? _.abilities.map(function (_) { return _.ability.name; }) : [],
    types: _.types ? _.types.map(function (_) { return _.type.name; }) : []
}); };
var normalizeId = function (id) { return id > 807 ? id - 9193 : id; };
module.exports = {
    getEntityFullData: getEntityFullData,
    getEntityData: getEntityData,
    normalizeId: normalizeId
};
//# sourceMappingURL=selectors.js.map