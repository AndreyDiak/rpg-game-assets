import hpUpgrade from "../../img/ugrades/hp_upgrade.png";
import damageUpgrade from "../../img/ugrades/damage_upgrade.png";
import armorUpgrade from "../../img/ugrades/armor_upgrade.png";
import React, {FC} from "react";

type RenderPlayerUpgradesType = {
  isHpUpgradeEquipped: boolean
  isDamageUpgradeEquipped: boolean
  isArmorUpgradeEquipped: boolean
}

export const RenderPlayerUpgrades:FC<RenderPlayerUpgradesType> = ({isHpUpgradeEquipped, isDamageUpgradeEquipped, isArmorUpgradeEquipped}) => {
  return (
    <>
      {isHpUpgradeEquipped && <div className="gameContentBoard__enemyBlock__img__upgrade gameContentBoard__enemyBlock__img__upgradeHp">
        <img src={hpUpgrade} alt=""/>
      </div>
      }
      {isDamageUpgradeEquipped && <div className="gameContentBoard__enemyBlock__img__upgrade gameContentBoard__enemyBlock__img__upgradeDamage">
        <img src={damageUpgrade} alt=""/>
      </div>
      }
      {isArmorUpgradeEquipped &&
      <div className="gameContentBoard__enemyBlock__img__upgrade gameContentBoard__enemyBlock__img__upgradeArmor">
        <img src={armorUpgrade} alt=""/>
      </div>
      }
    </>
  )
}