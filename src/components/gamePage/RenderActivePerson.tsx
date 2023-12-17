import Popover from "antd/lib/popover";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import armorUpgrade from "../../img/ugrades/armor_upgrade.png";
import armorUpgradeDisabled from "../../img/ugrades/armor_upgrade_disabled.png";
import damageUpgrade from "../../img/ugrades/damage_upgrade.png";
import damageUpgradeDisabled from "../../img/ugrades/damage_upgrade_disabled.png";
import hpUpgrade from "../../img/ugrades/hp_upgrade.png";
import hpUpgradeDisabled from "../../img/ugrades/hp_upgrade_disabled.png";
import { ActivePotionType, PotionType, UpgradeType } from "../../redux/app-reducer";
import { gameActions, HeroesType, SkillUpgradeType } from "../../redux/game-reducer";
import { AppStateType } from "../../redux/store";
import { isPotionAvailable, isUpgradesAvailable } from "../../utils/isUpgradeAvailableExpression";
import armor from "./../../img/types/armor.png";
import damage from "./../../img/types/damage.png";
import hp from "./../../img/types/hp.png";
import { RenderHpBar } from "./RenderHpBar";




type RenderActivePersonType = {
  item: HeroesType | ActivePotionType | UpgradeType
  type: 'hero' | 'potion' | 'upgrade'
  setIsUpgradeTakenOnBoard: (isUpgradeTakenOnBoard: boolean) => void
  setIsPotionTakenOnBoard: (isPotionTakenOnBoard: boolean) => void
}

export const RenderActivePerson: FC<RenderActivePersonType> = ({item, type, setIsPotionTakenOnBoard, setIsUpgradeTakenOnBoard}) => {
  const dispatch = useDispatch()
  const balance = useSelector((state: AppStateType) => state.gamePage.gameBalance)
  const playerBoardUpgrades = useSelector((state: AppStateType) => state.gamePage.playerBoardUpgrades)
  const playerBoardCopy = useSelector((state: AppStateType) => state.gamePage.playerBoard)
  
  const onButtonClick = () => {
    if (type === 'potion') {
      //
      setIsPotionTakenOnBoard(true)
    }
    if (type === 'upgrade') {
      // @ts-ignore
      if (balance - item.cost >= 0)
        // @ts-ignore
        dispatch(gameActions.setAvailableBalance(balance - item.cost))
      setIsUpgradeTakenOnBoard(true)
    }
  }
  // @ts-ignore
  // console.log(isUpgradesAvailable(playerBoardCopy, item.type))

  return (
    <>
      <div className="gameContentMenu__active">
        <div className="gameContentMenu__activeHeader">
          Активный предмет
        </div>
        {item.img && (type === 'potion' || type === 'upgrade') &&
        <>
          <div className="gameContentMenu__activeBlock">
            <div className="gameContentMenu__activeBlock__img">
              <img src={item.img} alt=""/>
            </div>
            <div className="gameContentMenu__activeBlock__about">
              {item.about} в течении матча
              <div className="gameContentMenu__activeBlock__about__danger">
                ВНИМАНИЕ:
                {type === 'potion' && ' Зелье можно использовать только один раз'}
                {type === 'upgrade'
                // @ts-ignore
                && ` Стоимость улучшения ${item.cost}` }
              </div>
            </div>
          </div>
          {type === 'upgrade'
          // @ts-ignore
          && balance - item.cost >= 0
          // @ts-ignore
          && isUpgradesAvailable(playerBoardCopy, item.type)
          && <div className="gameContentMenu__activeBlock__button">
              <button className="buttonBrown" onClick={onButtonClick}>Использовать</button>
            </div>
          }
          {type === 'potion'
          // @ts-ignore
          && isPotionAvailable(playerBoardCopy, item.type) 
          &&  <div className="gameContentMenu__activeBlock__button">
                <button className="buttonBrown" onClick={onButtonClick}>Использовать</button>
              </div>
          }
        </>
        }
        {item.img && type === 'hero' &&
        <div className="gameContentMenu__activePerson">
          <div className="gameContentMenu__activePerson__img">
            <img src={item.img} alt=""/>
          </div>
          <div className="gameContentMenu__activePerson__stats">
            <div className="gameContentMenu__activePerson__stat">
              <img src={hp} alt=""/>
              {/* @ts-ignore */}
              <RenderHpBar maxHP={item.hp} currentHP={item.currentHp} barWidth={150} color={'green'}/>
            </div>
            <div className="gameContentMenu__activePerson__stat">
              <img src={armor} alt=""/>
              {/* @ts-ignore */}
              <RenderHpBar maxHP={item.armor} currentHP={item.currentArmor} barWidth={150} color={'grey'}/>
            </div>
            <div className="gameContentMenu__activePerson__stat">
              <img src={damage} alt=""/>
              {/* @ts-ignore */}
              <RenderHpBar maxHP={20} currentHP={item.damage} barWidth={150} color={'#dd2c00 '}/>
            </div>
          </div>
          <div className="gameContentMenu__activePerson__upgrades">
            <div className="gameContentMenu__activePerson__upgradesBlock">
              <div className="gameContentMenu__activePerson__upgradesBlock__img">
                {/* @ts-ignore */}
                {item.isDamageUpgradeEquipped
                  ? <img src={damageUpgrade} alt=""/> : <img src={damageUpgradeDisabled} alt=""/>
                }
              </div>
            </div>
            <div className="gameContentMenu__activePerson__upgradesBlock">
              <div className="gameContentMenu__activePerson__upgradesBlock__img">
                {/* @ts-ignore */}
                {item.isHpUpgradeEquipped
                  ? <img src={hpUpgrade} alt=""/> : <img src={hpUpgradeDisabled} alt=""/>
                }
              </div>
            </div>
            <div className="gameContentMenu__activePerson__upgradesBlock">
              <div className="gameContentMenu__activePerson__upgradesBlock__img">
                {/* @ts-ignore */}
                {item.isArmorUpgradeEquipped
                  ? <img src={armorUpgrade} alt=""/> : <img src={armorUpgradeDisabled} alt=""/>
                }
              </div>
            </div>
          </div>
          <div className="gameContentMenu__activePerson__about">
            {item.about}
          </div>
          <div className="gameContentMenu__activePerson__turn">
            {/*  @ts-ignore  */}
            {item.isAbleToTakeDamage ? 'Может атаковать' : 'Уже атаковал'}
          </div>
          {/*  @ts-ignore  */}
          {item.boardIndex && <div className="gameContentMenu__activePerson__support">
            {/* @ts-ignore */}
            {playerBoardUpgrades[item.boardIndex].map((support: SkillUpgradeType) => {
              return (
                <>
                  <Popover content={support.about} title={'Герой находится под улучшением'}>
                    <div className="gameContentMenu__activePerson__supportItem">
                      <img src={support.img} alt=""/>
                    </div>
                  </Popover>
                </>
              )
            })}
          </div>}

        </div>
        }
      </div>
    </>
  )
}