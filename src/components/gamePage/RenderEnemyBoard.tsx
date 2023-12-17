import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import person_dead from "../../img/person_dead.png";
import { DamageType } from "../../redux/characters-reducer";
import { gameActions, HeroesType, RobberType, setSpyOnBoardThunk, takeDamageToHeroThunk } from "../../redux/game-reducer";
import { AppStateType } from "../../redux/store";
import { calculateAvailableHeroes } from "../../utils/calculateAvailableHeroes";
import { RenderHpBar } from "./RenderHpBar";

type RenderBoardType = {
  board: RobberType[]
  activeItem: HeroesType
  activePerson: HeroesType
  isHeroTakenOnBoard: boolean
  setIsHeroTakenOnBoard: (isHeroTakenOnBoard: boolean) => void
  takeDamageToEnemy?: (enemyIndex: number, damageType: DamageType, damageCount: number, heroIndex: number) => void
  setActiveItem: (activeItem: HeroesType) => void
}

export const RenderEnemyBoard:FC<RenderBoardType> = (
  {board, takeDamageToEnemy, activeItem, setActiveItem, isHeroTakenOnBoard, setIsHeroTakenOnBoard, activePerson}
  ) => {

  const dispatch = useDispatch()
  const playerBoard = useSelector((state: AppStateType) => state.gamePage.playerBoard)

  const onButtonClick = (enemy: RobberType, index: number) => {
    console.log('worked')
    if (
      activeItem.isAbleToTakeDamage
      && !isHeroTakenOnBoard 
      && enemy.name 
      && calculateAvailableHeroes("player", board).filter(enemy => enemy.boardIndex === index).length !== 0) {
      // @ts-ignore наносим урон разбойнику, если он удовлетворяет условиям...
      takeDamageToEnemy(index, activeItem.type, activeItem.damage, activeItem.boardIndex)
      // обновляем возможность удара в state...
      dispatch(gameActions.toggleAvailableToTake(activeItem.boardIndex))
      // убираем возможность наносить урон...
      setActiveItem({...activeItem, isAbleToTakeDamage: false})
      // если все герои нанесли урон, то бот начинает атаковать...
      dispatch(takeDamageToHeroThunk())
    } else {
      if (isHeroTakenOnBoard && activePerson.type === 'spy') {
        
        if (!board[index].name) {
          dispatch(setSpyOnBoardThunk(activePerson, index))
          dispatch(gameActions.setEnemyOnBoard())
          setIsHeroTakenOnBoard(false)
        }
      }
    }
  }

  return (
    <>
      {board.map((enemy, index) => {
        return (
            <div
              className="gameContentBoard__enemyBlock gameContentBoard__block"
              key={index}
              onClick={() => onButtonClick(enemy, index)}
              style={enemy.currentHp <= 0 ? {zIndex: 0} : {zIndex: 10}}
            >
              {enemy.currentHp <= 0 && <div className="gameContentBoard__enemyBlock__dead">
                <img src={person_dead} alt=""/>
              </div>
              }
              <div className="gameContentBoard__enemyBlock__img">
                <img src={enemy.img} alt=""/>
              </div>
              {enemy.currentHp >= 0 &&
              <div className="gameContentBoard__block__hp gameContentBoard__block__stats">
                {enemy.currentArmor > 0
                  ? <RenderHpBar maxHP={enemy.armor} currentHP={enemy.currentArmor} barWidth={120} color={'grey'}/>
                  : <RenderHpBar maxHP={enemy.hp} currentHP={enemy.currentHp} barWidth={120} color={'green'}/> }
              </div>
              }
            </div>
        )
      })}
    </>
  )
}