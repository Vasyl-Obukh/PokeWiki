const getEntityFullData = _ => ({
  ...getEntityData(_),
  baseExperience: _.base_experience,
  height: _.height,
  weight: _.weight,
  stats: _.stats.map(_ => ({ base: _.base_stat, name: _.stat.name }))
});

const getEntityData = _ => ({
  name: _.name,
  id: _.id,
  thumb: _.sprites.front_default,
  abilities: _.abilities.map(_ => _.ability.name),
  types: _.types.map(_ => _.type.name)
});

module.exports = {
  getEntityFullData,
  getEntityData
};