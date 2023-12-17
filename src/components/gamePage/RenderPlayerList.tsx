import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import scull from '../../img/scull.png';
import { gameActions, HeroesType } from "../../redux/game-reducer";
import { AppStateType } from "../../redux/store";

type RenderPlayerListType = {
  setIsHeroTakenOnBoard: (isHeroTakenOnBoard: boolean) => void
  setActivePerson: (activePerson: HeroesType) => void
  setActiveItem: (activeItem: HeroesType) => void
  setActiveType: (activeType: 'hero') => void
}
export const RenderPlayerList: FC<RenderPlayerListType> = React.memo(({setIsHeroTakenOnBoard, setActivePerson, setActiveItem, setActiveType}) => {

  const dispatch = useDispatch()
  const playerDeck = useSelector((state: AppStateType) => state.gamePage.playerDeck)
  const personCostToSummon = useSelector((state: AppStateType) => state.gamePage.personCostToSummon)
  const gameBalance = useSelector((state: AppStateType) => state.gamePage.gameBalance)

  const onAvatarClick = (type: 'hero', item: HeroesType) => {
    setActiveItem(item)
    setActiveType(type)
  }

  const onButtonClick = (price: number, player: HeroesType) => {
    if (gameBalance >= price) {
      dispatch(gameActions.setAvailableBalance(gameBalance - price))

      setActivePerson(player)
      setIsHeroTakenOnBoard(true)
    }
  }

  return (
    <>
      <div className="gameContentMenu__characters">
        <div className="gameContentMenu__charactersHeader">
          Персонажи
        </div>
        <div className="gameContentMenu__charactersList">
        {playerDeck.map((player, index) => {
          const price = player.name ? personCostToSummon.filter(cost => cost.type === player.type)[0].cost[player.quantityOnBoard] : 0

          return (
            <>
              {player.name ?
                <div className="gameContentMenu__charactersBlock" key={index}>
                    <div className="gameContentMenu__charactersBlock__img" onClick={() => onAvatarClick('hero', player)}>
                      <img src={player.img} alt=""/>
                    </div>
                    <div className="gameContentMenu__charactersBlock__price">
                      <button className="gameContentMenu__charactersBlock__priceButton" onClick={() => onButtonClick(price, player)}>
                        {price}
                      </button>
                    </div>
                  </div> : <>
                  <div className="gameContentMenu__charactersBlock__none"></div>
                </>
              }
            </>
          )
        })}
        </div>
        <div className="gameContentMenu__charactersBalance">
          Доступно: {gameBalance} <img src={scull} alt=""/>
        </div>
      </div>
    </>
  )
})