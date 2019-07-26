interface Stat {
  base: number,
  name: string
}

export interface BasicPokemonShape {
  id: number,
  name: string,
  thumb: string | null
}

export interface PokemonShape extends BasicPokemonShape {
  baseExperience?: number,
  height?: number,
  weight?: number,
  stats?: Stat[],
  types: string[],
  abilities: string[]
}