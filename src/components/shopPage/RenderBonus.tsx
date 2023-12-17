import { useDispatch, useSelector } from "react-redux";
import { CharacterType } from "../../redux/characters-reducer";
import { profileActions } from "../../redux/profile-reducer";
import { ChestsCostType, shopActions } from "../../redux/shop-reducer";
import { AppStateType } from "../../redux/store";
import { CharacterCard } from "../deckPage/CharacterCard";
import bag from './../../img/bag.png';
import gem from './../../img/gem.svg';
import gold from './../../img/gold_coin.svg';
import silver from './../../img/silver_coin.svg';

export const RenderBonus = () => {

  const bonusList = useSelector((state: AppStateType) => state.shopPage.bonusList)
  const charactersCopy = useSelector((state: AppStateType) => state.characters.charactersList)
  // TODO перенос на сторону сервера . . .
  // const [isCurrencyTaken, setIsCurrencyTaken] = useState( [false, false] )
  // const [isBonusCardsTaken, setIsBonusCardsTaken] = useState( [false, false, false] )
  // const [isRandomCardsTaken, setIsRandomCardsTaken] = useState( [false, false, false] )
  const dispatch = useDispatch()

  let onCurrencyTake = (index: number, type: ChestsCostType, count: number) => {
    // делаем запись о том, что мы совершили покупку, и больше не можем этого делать . . .
    dispatch(shopActions.setIsCurrencyTaken(index))
    // добавляем на счет игрока валюту . . .
    dispatch(profileActions.addCurrencyToProfile(type, count))
  }
  let onCardTaken = (index: number, card: CharacterType, count: number, cost: number, type: ChestsCostType = 'silver', cardType: 'bonusCard' | 'randomCard') => {
    // снимием со счета игрока стоимость карт . . .
    dispatch(profileActions.addCurrencyToProfile(type, -cost*count))
    // делаем запись о том, что мы совершили покупку, и больше не можем этого делать . . .
    cardType === 'bonusCard'
      ? dispatch(shopActions.setIsBonusCardTaken(index))
      : dispatch(shopActions.setIsRandomCardTaken(index))
    // добавляем карту в инвентарь игрока . . .
    dispatch(profileActions.addCardToProfile({...card, count: count}, count))
  }
  return (
    <>
      <div className="shopContent__bonus">
          {bonusList.bonusCurrency.map((currency, index) => {
            return (
              <div className="shopContent__bonusBlock">
                <div className="shopContent__bonusBlock__img">
                  <img src={bag} alt=""/>
                  <div className="shopContent__bonusBlock__imgCurrency">
                    <img src={currency.type === 'silver' ? silver : currency.type === 'gold' ? gold : gem} alt=""/>
                  </div>
                </div>
                <div className="shopContent__bonusBlock__text">
                  X{currency.count}
                </div>
                <div className="shopContent__bonusBlock__button">
                  {!currency.taken
                    ? <button disabled={currency.taken} className="buttonBrown" onClick={() => onCurrencyTake(index, currency.type, currency.count)}>
                        Забрать
                      </button>
                    : <div className="textCommon">
                        Получено!
                      </div>
                  }
                </div>
              </div>
            )
          })}
          {bonusList.bonusCards.map((bonus, index) => {

            let characterCopy = {}

            charactersCopy.forEach(ch => {
              if (ch.name === bonus.name) characterCopy = ch
            })

            return (
              <div className="shopContent__bonusBlock">
                {/* @ts-ignore */}
                <CharacterCard character={characterCopy} isCardReplaced={true} visible={true}/>
                <div className="shopContent__bonusBlock__text">
                  X{bonus.count}
                </div>
                <div className="shopContent__bonusBlock__button">
                  {!bonus.taken ?
                    // @ts-ignore
                    <button className="buttonBrown" onClick={() => onCardTaken(index, characterCopy, bonus.count, bonus.cost, 'silver', "bonusCard" )}>
                      {bonus.count * bonus.cost} <img style={{width: '26px'}} src={silver} alt=""/>
                    </button>
                    : <div className="textCommon">
                        Получено!
                      </div>
                  }
                </div>
              </div>
            )
          })}
          {bonusList.randomCards.map((random, index) => {

            let characterCopy = {}

            charactersCopy.forEach(ch => {
              if (ch.name === random.name) characterCopy = ch
            })

            return (
              <div className="shopContent__bonusBlock">
                {/* @ts-ignore */}
                <CharacterCard character={characterCopy} isCardReplaced={true} visible={random.taken}/>
                <div className="shopContent__bonusBlock__text">
                  X{random.count}
                </div>
                <div className="shopContent__bonusBlock__button">
                  {!random.taken ?
                    // @ts-ignore
                    <button className="buttonBrown" onClick={() => onCardTaken(index, characterCopy, random.count, random.cost, 'silver', "randomCard" )} >
                      {random.count * random.cost} <img style={{width: '26px'}} src={silver} alt=""/>
                    </button>
                    :
                    <div className="textCommon">
                      Получено!
                    </div>
                  }
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}