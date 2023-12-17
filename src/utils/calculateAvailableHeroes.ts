import {HeroesType, RobberType} from "../redux/game-reducer";

export const calculateAvailableHeroes = (attacker: 'player' | 'enemy', board: (HeroesType | RobberType)[] ) => {
  return  [0, 4, 8, 12].map(number => {
    return attacker === 'player'
      ? [...board].splice(number,4).filter(hero => hero.currentHp > 0)[0]
      : [...board].splice(number,4).reverse().filter(hero => hero.currentHp > 0)[0]
  }).filter(hero => hero !== undefined)
}