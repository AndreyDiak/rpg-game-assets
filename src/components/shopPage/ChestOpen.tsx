import { Modal } from "antd";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CharacterType } from "../../redux/characters-reducer";
import { addLootToProfileThunk, profileActions } from "../../redux/profile-reducer";
import { ChestType } from "../../redux/shop-reducer";
import { AppStateType } from "../../redux/store";
import { CharacterCard } from "../deckPage/CharacterCard";
import bag from './../../img/bag.png';
import commonCard from './../../img/cards/Cards_color1/Civilian_card_back/Civilian_card_back.png';
import rareCard from './../../img/cards/Cards_color2/Civilian_card_back/Civilian_card_back.png';
import epicCard from './../../img/cards/Cards_color3/Civilian_card_back/Civilian_card_back.png';
import gem from './../../img/gem.svg';
import gold from './../../img/gold_coin.svg';
import silver from './../../img/silver_coin.svg';

export type ChestOpenType = {
  activeChest: ChestType
  isChestOpened: boolean
  setIsChestOpened: (isChestOpened: boolean) => void
}

export const ChestOpen: FC<ChestOpenType> = ({activeChest, isChestOpened, setIsChestOpened,}) => {

  const inventoryCopy = useSelector((state: AppStateType) => state.profile.inventory)

  // console.log(inventoryCopy.cards)

  const [isRoadVisible, setIsRoadVisible] = useState(true)
  const [left, setLeft] = useState(0)
  const [isAbleToExit, setIsAbleToExit] = useState(true)
  const [isButtonVisible, setIsButtonVisible] = useState(true)

  const lootRoad = useSelector((state: AppStateType) => state.shopPage.lootRoad)
  const lootWinner = useSelector((state: AppStateType) => state.shopPage.lootRoadWinNumber)
  const lootObject = useSelector((state: AppStateType) => state.shopPage.lootObject)
  const [cardToShow, setCardToShow] = useState({} as CharacterType)

  const dispatch = useDispatch()

  const onModalExit = () => {
    if (isAbleToExit) {
      setIsRoadVisible(true)
      setIsButtonVisible(true)
      setIsChestOpened(false)
    }
  }

  const onButtonClick = () => {

    setIsRoadVisible(true)
    setIsButtonVisible(false)
    setIsAbleToExit(false)

    dispatch(profileActions.addCurrencyToProfile(activeChest.costType, -activeChest.cost))

    let ld = Math.random() * 0.8 + 0.3
    setLeft(-(lootWinner - 2 - ld) * 110)

    if (inventoryCopy.cards.some((card: CharacterType) => card.name === lootObject.person.name) ) {
     
      inventoryCopy.cards.forEach((card, index) => {
        if (card.name === lootObject.person.name) {
          console.log(inventoryCopy.cards[index])
          setCardToShow(inventoryCopy.cards[index])
        }
      })
    } else {
      setCardToShow(lootObject.person)
    }

    setTimeout(() => {
      setIsRoadVisible(false)
      setIsAbleToExit(true)
      setLeft(0)
      // setIsButtonVisible(true)

      dispatch(addLootToProfileThunk(lootObject))
    }, 8200)

  }

  const typeColor = lootObject.type === 'common' ? '#4fc3f7'
    : lootObject.type === 'rare' ? '#dd2c00' : '#512da8'

  const lootImg = lootRoad[lootWinner] === 'silver'
    ? silver : lootRoad[lootWinner] === 'gold'
      ? gold : gem

  // console.log(lootObject)

  return (
    <>
      <Modal
        title={'Испытай удачу!'}
        visible={isChestOpened}
        footer={null}
        onCancel={() => onModalExit()}
        onOk={() => onModalExit()}
        bodyStyle={{padding: '0px'}}
        width={1000}
      >
      <div className="chestOpen darken darken-6">
        {
          isRoadVisible
            ? <div className="chestRoad">
                <div className="chestRoadResult">
                {/* блок необходимый для стрелки указания победного лота... */}
                </div>
                <div className="chestOpen__road" style={{width: `${(lootRoad.length) * 110}px`, left: left + 50}}>
                {lootRoad.map((loot, index) => {
                  return (
                    <>
                      {/* style={index === lootWinner ? {border: '1px solid red'} : {}} */}
                      <div className="chestOpen__roadBlock" >
                        {loot === 'silver' || loot === 'gold' || loot === 'gem'
                          ? <>
                              <img src={bag} alt=""/>
                              <img className="chestOpen__roadBlock__img" src={
                                loot === 'silver'
                                  ? silver : loot === 'gold'
                                    ? gold : gem} alt=""/>
                            </>
                          :
                            <>
                              <img src={
                                loot === 'common'
                                  ? commonCard : loot === 'rare'
                                    ? rareCard : epicCard} alt=""/>
                            </>
                        }
                      </div>
                    </>
                  )
                  })}
                </div>
              </div>
            : <div className="chestOpen__loot">
                <div className="chestOpen__lootHeader">
                  Поздравляем!
                </div>
                <div className="chestOpen__lootBlock">
                  {lootObject.person.name
                    // Экран, если выпадает персонаж . . .
                    ? <div style={{filter: `drop-shadow(0 0 30px ${typeColor})`, display: 'block', zIndex: '100'}}>
                        <CharacterCard character={cardToShow} visible={true} isCardReplaced={true} />
                        <div style={{textAlign: 'center'}}>X{lootObject.count}</div>
                      </div>
                    // Экран, если выпадет монета . . .
                    : <>
                        <div className="chestOpen__lootBlock__text">
                          Вы получили {lootObject.count}
                        </div>
                        <div className="chestOpen__lootBlock__img">
                          <img src={lootImg} alt=""/>
                        </div>
                      </>
                  }
                </div>
              </div>
        }
        {isButtonVisible
          &&
            <button className="chestRoadButton" onClick={() => onButtonClick()}>
              Открыть
            </button>
        }
      </div>
      </Modal>
    </>
  )
}