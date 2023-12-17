import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChestType, openChestThunk } from "../../redux/shop-reducer";
import { AppStateType } from "../../redux/store";
import gem from './../../img/gem.svg';
import gold from './../../img/gold_coin.svg';
import silver from './../../img/silver_coin.svg';


export type RenderChestType = {
  chest: ChestType
  setActiveChest: (chest: ChestType) => void
  setIsChestInfoShown: (isChestInfoShown: boolean) => void
  setIsChestOpened: (isChestOpened: boolean) => void
  //...
}

export const RenderChest: FC<RenderChestType>  = ({chest, setActiveChest, setIsChestInfoShown, setIsChestOpened}) => {

  const dispatch = useDispatch()
  const charactersCopy = useSelector((state: AppStateType) => state.characters.charactersList)
  const typeColor = chest.type === 'common' ? '#fff'
    : chest.type === 'rare' ? '#388e3c'
      : chest.type === 'epic' ? '#512da8'
        : '#f57c00'

  return (
    <>
      <div className="shopContent__chest">
        <div className="shopContent__chestHeader">
          {chest.type[0].toUpperCase() + chest.type.substring(1)} Chest
        </div>
        <div className="shopContent__chestImg" onClick={() => {
          setActiveChest(chest)
          setIsChestInfoShown(true)
        }} style={{filter: `drop-shadow(0 0 30px ${typeColor})`}}>
          <img src={chest.img} alt=""/>
        </div>
        <div className="shopContent__chestButton">
          <button className="buttonBrown" onClick={() => {
            console.log(charactersCopy)
            // decrease the balance from player...
            setActiveChest(chest)
            // roll random item from chest...
            dispatch(openChestThunk(chest))
            //TODO включить обратно
            setIsChestOpened(true)
          }}>
            {chest.cost + ' '}
            <img src={chest.costType === 'silver' ? silver : chest.costType === 'gold' ? gold : gem} alt=""/>
          </button>
        </div>

      </div>
    </>
  )
}