import { SkillUpgradeType } from './../redux/game-reducer';
// ВАЖНО
// 1) если персонаж находится в клетке с повышением урона то даем буст
// 2) сверяем классы персонажей
// 3) проверяем наличие брони

import {DamageType} from "../redux/characters-reducer"
import {HeroesType, RobberType} from "../redux/game-reducer";
import {subtractionOfTwoNumbers} from "./mathsExpressions";

export const isArmorOrHpDamageCalculation = (targetArmorHp: number) => {
  // если у персонажа есть броня, то она поглащает 20% урона...
  return targetArmorHp > 0 ? 0.8 : 1
}

export const classDamageCalculation = (heroClass: DamageType, targetClass: DamageType) => {
// spy и support : 1x
// melee -> long / long -> magic / magic -> melee : 1.5x
// long -> melee / magic -> long / melee -> magic : 0.75x

  return (heroClass === 'melee' && targetClass === 'long') ||
         (heroClass === 'long' && targetClass === 'magic') ||
         (heroClass === 'magic' && targetClass === 'melee')
            ? 1.5
            : (heroClass === 'long' && targetClass === 'melee') ||
              (heroClass === 'magic' && targetClass === 'long') ||
              (heroClass === 'melee' && targetClass === 'magic')
                ? 0.75
                : 1
}

export const supportDamageCalculation = (upgradeBoard: SkillUpgradeType[][], boardIndex: number) => {
  return 1 + upgradeBoard[boardIndex].filter(upgrade => upgrade.type === 'damage').reduce((total, item) => {return total + item.count}, 0)
}

export const debaffDamageCalculation = (debaffBoard: SkillUpgradeType[][], boardIndex: number) => {
  return 1 + debaffBoard[boardIndex].filter(debaff => debaff.type === 'protection').reduce((total, item) => {return total + item.count}, 0)
}

export const supportProtectionCalculation = (upgradeBoard: SkillUpgradeType[][], boardIndex: number) => {
  return 1 - upgradeBoard[boardIndex].filter(upgrade => upgrade.type === 'protection').reduce((total, item) => {return total + item.count}, 0)
}

export const takeEnemyDamage = (hero: HeroesType | RobberType, damageAmount: number) => {
  let heroCopy = {...hero}

  if (heroCopy.currentArmor > 0) {
    heroCopy.currentArmor = subtractionOfTwoNumbers(heroCopy.currentArmor, damageAmount)
    if (heroCopy.currentArmor < 0)
      heroCopy.currentArmor = 0
  } else {
    if (heroCopy.currentHp > 0) {
      heroCopy.currentHp = subtractionOfTwoNumbers(heroCopy.currentHp, damageAmount)
      if (heroCopy.currentHp < 0)
        heroCopy.currentHp = 0
    }
  }
  return {...heroCopy}
}

