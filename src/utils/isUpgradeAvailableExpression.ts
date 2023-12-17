import { HeroesType } from './../redux/game-reducer';

type upgradePotionType = 'hp' | 'armor' | 'damage'

export const isUpgradesAvailable = (playerBoard: HeroesType[], type: upgradePotionType) => {
   return playerBoard.filter(hero => hero.currentHp > 0).reduce((total, item) => {
     if (type === 'hp'      && item.isHpUpgradeEquipped) total+=1
     if (type === 'damage'  && item.isDamageUpgradeEquipped) total+=1
     // доп провека, так-как броню можно надеть только если она у тебя еще осталась...
     if (type === 'armor'   && (item.isArmorUpgradeEquipped || item.currentArmor === 0)) total+=1
     return total
   }, 0) < playerBoard.filter(hero => hero.currentHp > 0).length ? true : false
}

export const isHeroAvailableToUpgrade = (hero: HeroesType, type: upgradePotionType) => {
  if ((hero.isArmorUpgradeEquipped || hero.currentArmor === 0) && type === 'armor') return false
  if (hero.isDamageUpgradeEquipped && type === 'damage') return false
  if (hero.isHpUpgradeEquipped && type === 'hp') return false
  if (!hero.name) return false
  return true
}

export const isPotionAvailable = (playerBoard: HeroesType[], potionType: upgradePotionType) => {
  return playerBoard.filter(hero => hero.currentHp > 0).reduce((total, item) => {
    if (potionType === 'hp' && item.currentHp < item.hp) total += 1
    if (potionType === 'armor' && item.currentArmor > 0 && item.currentArmor < item.armor) total += 1
    if (potionType === 'damage') total += 1
    return total
  }, 0) > 0 ? true : false
}

export const isHeroAvailableToPotion = (hero: HeroesType, type: upgradePotionType) => {
  if (type === 'armor' && hero.currentArmor === hero.armor) return false
  if (type === 'hp' && hero.currentHp === hero.hp) return false
  return true
}