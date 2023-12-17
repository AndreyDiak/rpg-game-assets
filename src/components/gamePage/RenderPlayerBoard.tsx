import React, {FC, useEffect, useState} from "react";
import {gameActions, HeroesType, setHeroOnBoardThunk, SkillUpgradeType} from "../../redux/game-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ActivePotionType, PotionType, UpgradeType} from "../../redux/app-reducer";
import {AppStateType} from "../../redux/store";
import {RenderPlayerBlock} from "./RenderPlayerBlock";
import {Popover} from "antd";
import { isHeroAvailableToPotion, isHeroAvailableToUpgrade } from "../../utils/isUpgradeAvailableExpression";
import { profileActions } from "../../redux/profile-reducer";

type RenderBoardType = {
  board: HeroesType[]
  activePerson: HeroesType
  activeItem: ActivePotionType | UpgradeType | HeroesType
  activeType: 'potion' | 'upgrade' | 'hero'
  activePotionIndex: number
  isHeroTakenOnBoard: boolean
  isUpgradeTakenOnBoard: boolean
  isPotionTakenOnBoard: boolean
  setIsHeroTakenOnBoard: (isHeroTakenOnBoard: boolean) => void
  setIsUpgradeTakenOnBoard: (isUpgradeTakenOnBoard: boolean) => void
  setIsPotionTakenOnBoard: (isPotionTakenOnBoard: boolean) => void
  setActiveItem: (activeItem: HeroesType) => void
  setActiveType: (activeType: 'hero') => void
  // takeDamageToEnemy: (enemyName: RobbersNamesType, damageType: DamageType, damageCount: number) => void
}

export const RenderPlayerBoard:FC<RenderBoardType> = (
  {
    board,
    isHeroTakenOnBoard, isPotionTakenOnBoard, isUpgradeTakenOnBoard,
    activePerson, activeItem, activeType, activePotionIndex,
    setIsHeroTakenOnBoard, setIsUpgradeTakenOnBoard, setIsPotionTakenOnBoard, setActiveItem, setActiveType
  }) => {

  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState(null as null | number)
  const playerBoardUpgrades = useSelector((state: AppStateType) => state.gamePage.playerBoardUpgrades)

  useEffect(() => {
    if (activeType !== 'hero')
      setActiveIndex(null)
  },[activeType])

  const onButtonClick = (index: number) => {
    // @ts-ignore
    console.log(isHeroAvailableToPotion(board[index], activeItem.type))
    console.log(isPotionTakenOnBoard)
    // если мы вешаем апргрейд или зелье, то мы не должны сетать новый активный предмет...
    if( !isUpgradeTakenOnBoard && !isPotionTakenOnBoard) {
      // isHeroAvailableToUpgrade(board[index], activeItem.type) isHeroAvailableToPotion(board[index], activeItem.type)
      
      setActiveItem({...board[index]})
      setActiveType('hero')
      setActiveIndex(index)
    }  
    
    if (isHeroTakenOnBoard && activePerson.name && activePerson.type !== 'spy') {
      dispatch(setHeroOnBoardThunk(activePerson, index))
      setIsHeroTakenOnBoard(false)
      return null
    }
    // @ts-ignore / доп проверка нужна, чтобы не потратить айтем в пустую...
    if (isUpgradeTakenOnBoard && isHeroAvailableToUpgrade(board[index], activeItem.type)) {
      dispatch(gameActions.upgradePerson(activeItem as UpgradeType, index))
      setIsUpgradeTakenOnBoard(false)
      return null
    }
    // @ts-ignore / доп проверка нужна, чтобы не потратить айтем в пустую...
    if (isPotionTakenOnBoard && isHeroAvailableToPotion(board[index], activeItem.type)) {

      dispatch(gameActions.applyPotionOnEnemy(activeItem as ActivePotionType, index))
      dispatch(profileActions.removePotionFromActiveInventory(activePotionIndex))
      setIsPotionTakenOnBoard(false)
      return null
    }

  }

  return (
    <>
      {board.map((enemy, index) => {
        return (
            <div
              className="gameContentBoard__enemyBlock gameContentBoard__block"
              key={index}
              onClick={() => onButtonClick(index)}
              style={
                enemy.currentHp <= 0 ? {zIndex: 0} : {zIndex: 10}
                && index === activeIndex ? {border: '1px solid #e65100', background: 'rgba(1, 87, 155, 0.4)'} : {}
                && playerBoardUpgrades[index].length ? {background: 'rgba(191, 54, 12, 0.4)'} : {}
              }
            >
              {playerBoardUpgrades[index].length > 0 && !enemy.name
                ? <div className="gameContentBoard__enemyBlock__support"
                       style={playerBoardUpgrades[index].length === 1 ? {gridTemplateColumns: '1fr'} : {}}>
                    {playerBoardUpgrades[index].map((support: SkillUpgradeType) => {
                      return (
                        <>
                        <Popover content={support.about} title={'Клетка находится под улучшением'}>
                          <div className="gameContentBoard__enemyBlock__supportItem">
                            <img src={support.img} alt=""/>
                          </div>
                        </Popover>
                        </>
                      )
                    })}
                  </div>
                : ''
              }
              <RenderPlayerBlock enemy={enemy} />
            </div>
        )
      })}
    </>
  )
}