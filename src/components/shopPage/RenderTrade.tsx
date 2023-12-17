import {FC} from "react";

import silver from './../../img/silver_coin.svg'
import gem from './../../img/gem.svg'
import gold from './../../img/gold_coin.svg'
import bag from './../../img/bag.png'
import {ChestsCostType} from "../../redux/shop-reducer";
import {useDispatch} from "react-redux";
import {profileActions} from "../../redux/profile-reducer";

type RenderTradeType = {
  tradeList: {toGive: number, toTake: number}[]
  type: 'silver' | 'gold'
}
export const RenderTrade: FC<RenderTradeType> = ({tradeList, type}) => {

  const dispatch = useDispatch()

  const onButtonClick = (type: ChestsCostType, count: number, cost: number) => {
    dispatch(profileActions.addCurrencyToProfile('gem', -cost))
    dispatch(profileActions.addCurrencyToProfile(type, count))
  }

  return (
    <>
      <div className="shopContent__trade">
        {tradeList.map((trade, index) => {
          return (
            <>
              <div className="shopContent__tradeBlock">
                <div className="shopContent__tradeBlock__img">
                  <img src={bag} alt=""/>
                  <div className="shopContent__tradeBlock__imgCurrency">
                    <img src={type === 'silver' ? silver : gold} alt=""/>
                  </div>
                </div>
                <div className="shopContent__tradeBlock__text">
                  X{trade.toTake}
                </div>
                <div className="shopContent__tradeBlock__button">
                  <button className="buttonBrown" onClick={() => onButtonClick(type, trade.toTake, trade.toGive)}>
                    {trade.toGive} <img src={gem} alt=""/>
                  </button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}