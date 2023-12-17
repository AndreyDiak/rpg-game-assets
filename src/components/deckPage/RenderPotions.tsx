import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PotionType } from "../../redux/app-reducer"
import { AppStateType } from "../../redux/store"
import {addPotionToActiveInventoryThunk} from "../../redux/profile-reducer"

export const RenderPotions = () => {

  const dispatch = useDispatch()
  const potions = useSelector((state: AppStateType) => state.profile.inventory.potions)
  const activePotions = useSelector((state: AppStateType) => state.profile.deck.potions)

  const [activeItem, setActiveItem] = useState({} as PotionType)

  const onButtonClick = (index: number) => {
    dispatch(addPotionToActiveInventoryThunk(activeItem, index))
    setActiveItem({} as PotionType)
  }

  return (
    <div className="deckContentPotions">
      <div className="deckContentPotions__active">
        <div className="deckContentPotions__activeHeader">
          Зелья
        </div>
        <div className="deckContentPotions__activeList">
          <div className="gameContentMenu__inventory__blockList">
            {activePotions.map((potion, index) => {
              return (
                <div className="gameContentMenu__inventory__blockList__item" onClick={() => onButtonClick(index)}>
                  <div className="gameContentMenu__inventory__blockList__itemImg">
                    <img src={potion.img} alt="" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
      </div>
      <div className="deckContentPotions__inventory">
        <div className="deckContentPotions__inventoryHeader">
          Ваш инвентарь
        </div>
        <div className="deckContentPotions__inventoryList gameContentMenu__inventory__blockList">
          {potions.map((potion, index) => {
            return (
              <div className="deckContentPotions__inventoryListItem gameContentMenu__inventory__blockList__item" onClick={() => {
                // @ts-ignore
                setActiveItem(potion)
              }}>
                {/*  @ts-ignore */}
                {potion.amount > 0 
                && <>
                  <div className="gameContentMenu__inventory__blockList__itemImg">
                    <img src={potion.img} alt="" />
                  </div>
                  <div className="gameContentMenu__inventory__blockList__itemText">
                    <div className="gameContentMenu__inventory__blockList__itemText__block">
                     {potion.amount}
                    </div>
                  </div>
                </>
                }
              </div>
            )
          })}
        </div>
      </div>
      <div className="deckContentPotions__about">
        {/* @ts-ignore */}
        {activeItem.amount 
        && <>
            {/* @ts-ignore */}
            <div className="deckContentPotions__aboutImg"><img src={activeItem.img} alt="" /></div>
            <div className="deckContentPotions__aboutStats">
              {/* @ts-ignore */}
              <div className="deckContentPotions__aboutStats__text">{activeItem.about}</div>
              {/* @ts-ignore */}
              <div className="deckContentPotions__aboutStats__amount">В наличии: <b>{activeItem.amount}</b></div>
           </div>
          </>
          }
      </div>
    </div>
  )
}

