const getEntityFullData = (_) => (Object.assign({}, getEntityData(_), { baseExperience: _.base_experience, height: _.height, weight: _.weight, stats: _.stats ? _.stats.map(_ => ({ base: _.base_stat, name: _.stat.name })) : [] }));
const getEntityData = (_) => ({
    name: _.name,
    id: normalizeId(_.id),
    thumb: _.sprites ? _.sprites.front_default : '',
    abilities: _.abilities ? _.abilities.map(_ => _.ability.name) : [],
    types: _.types ? _.types.map(_ => _.type.name) : []
});
const normalizeId = (id) => id > 807 ? id - 9193 : id;
module.exports = {
    getEntityFullData,
    getEntityData,
    normalizeId
};
