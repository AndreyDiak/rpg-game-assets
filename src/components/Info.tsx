import './../style/InfoPage.css'
import silver from './../img/silver_coin.svg'
import gem from './../img/gem.svg'
import gold from './../img/gold_coin.svg'
import { useSelector } from 'react-redux'
import { AppStateType } from '../redux/store'
export const Info = () => {

  const playerInfo = useSelector((state: AppStateType) => state.profile)

  return (
    <div className="info">
      <div className="infoPlayer">
        <div className="infoPlayer__name">ALPHA (0.0.5)</div>
        <div className="infoPlayer__level">У игрока будет лвл? А как это работает...</div>
      </div>
      <div className="infoBlocks">
        <div className="infoBlock">
        <div className="infoBlock__value">{playerInfo.gem}</div>
          <div className="infoBlock__img"><img src={gem} alt="" /></div>
        </div>
        <div className="infoBlock">
        <div className="infoBlock__value">{playerInfo.silver}</div>
          <div className="infoBlock__img"><img src={silver} alt="" /></div>
        </div>
        <div className="infoBlock">
        <div className="infoBlock__value">{playerInfo.gold}</div>
          <div className="infoBlock__img"><img src={gold} alt="" /></div>
        </div>
      </div>
    </div>
  )
}