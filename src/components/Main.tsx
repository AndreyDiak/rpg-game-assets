import { Routes, Route } from 'react-router-dom'
import { DeckPage } from '../pages/DeckPage'
import { MenuPage } from '../pages/MenuPage'
import { ShopPage } from '../pages/ShopPage'
import { Info } from './Info'
import {MapPage} from "../pages/MapPage";
import {GamePage} from "../pages/GamePage";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import { ForgePage } from '../pages/ForgePage'

// import './../style/Main.css'

export const Main = () => {
  const isLevelStarted = useSelector((state: AppStateType) => state.app.isLevelStarted)
  return (
    <div className="main">
      {!isLevelStarted && <Info />}
      <Routes>
        <Route path='/' element={ <DeckPage/> } />
        <Route path='/deck' element={ <DeckPage/> }/>
        <Route path='/menu' element={ <MenuPage/> }/>
        <Route path='/shop' element={ <ShopPage/> }/> 
        <Route path='/map'  element={ <MapPage/>  }/>
        <Route path='/game' element={ <GamePage/> }/>
        <Route path='/smithy' element={ <ForgePage/> } />
      </Routes>
    </div>
  )
}