import React, {FC} from "react";
import {HeroesType} from "../../redux/game-reducer";
import person_dead from "../../img/person_dead.png";
import damage from "../../img/types/damage.png";
import damageDisabled from "../../img/types/damage_disabled.png";
import {RenderPlayerUpgrades} from "./RenderPlayerUpgrades";
import {RenderHpBar} from "./RenderHpBar";

export const RenderPlayerBlock:FC<{enemy: HeroesType}> = ({enemy}) => {
  return (
    <>
      {enemy.currentHp <= 0 && <div className="gameContentBoard__enemyBlock__dead">
        <img src={person_dead} alt=""/>
      </div>
      }
      <div className="gameContentBoard__enemyBlock__img">
        <img src={enemy.img} alt=""/>

        {enemy.damage
        && <div className="gameContentBoard__enemyBlock__img__damage">
          <img src={enemy.isAbleToTakeDamage ? damage : damageDisabled} alt=""/>
        </div>
        }

        <RenderPlayerUpgrades
          isHpUpgradeEquipped={enemy.isHpUpgradeEquipped}
          isDamageUpgradeEquipped={enemy.isDamageUpgradeEquipped}
          isArmorUpgradeEquipped={enemy.isArmorUpgradeEquipped}
        />

      </div>
      {enemy.currentHp >= 0 &&
      <div className="gameContentBoard__block__hp gameContentBoard__block__stats">
        {enemy.currentArmor > 0
          ? <RenderHpBar maxHP={enemy.armor} currentHP={enemy.currentArmor} barWidth={120} color={'grey'}/>
          : <RenderHpBar maxHP={enemy.hp} currentHP={enemy.currentHp} barWidth={120} color={'green'}/> }
      </div>
      }
    </>
  )
}