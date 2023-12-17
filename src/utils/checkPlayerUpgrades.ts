import { HeroesType, SkillUpgradeType } from './../redux/game-reducer';
export const checkPlayerUpgradesBoard = (playerBoard: HeroesType[], playerBoardUpgrades: SkillUpgradeType[][]) => {
  return playerBoardUpgrades.map((upgrades, upgradesIndex) => {
    if (upgrades.length > 0) {
      // если есть активные перки то проверяем жив ли хозяин
      upgrades.forEach((upgrade, upgradeIndex) => {
        if (playerBoard[upgrade.owner].currentHp === 0) {
          // если пешка саппорта мертва, то мы выключаем способность...
          playerBoardUpgrades[upgradesIndex].splice(upgradeIndex, 1)
        }
      })
    }
    return upgrades
  })
}