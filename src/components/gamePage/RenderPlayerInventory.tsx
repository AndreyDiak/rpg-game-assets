import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {ActivePotionType, PotionType, UpgradeType} from "../../redux/app-reducer";
import {FC} from "react";
type RenderPlayerInventoryType = {
  setActiveItem: (activeItem: ActivePotionType | UpgradeType) => void
  setActiveType: (activeType: 'potion' | 'upgrade') => void
  setActiveIndex: (activeIndex: number) => void
}
export const RenderPlayerInventory: FC<RenderPlayerInventoryType> = ({setActiveItem, setActiveType, setActiveIndex}) => {

  const dispatch = useDispatch()
  const playerPotions = useSelector((state: AppStateType) => state.profile.deck.potions)
  const playerUpgrades = useSelector((state: AppStateType) => state.app.upgradeList)

  const onButtonClick = (type: 'potion' | 'upgrade', item: ActivePotionType | UpgradeType, index: number) => {
    setActiveItem(item)
    setActiveType(type)
    setActiveIndex(index)
  }

  return (
    <>
      <div className="gameContentMenu__inventory">
        <div className="gameContentMenu__inventory__block">
          <div className="gameContentMenu__inventory__blockHeader">
            Зелья
          </div>
          <div className=" gameContentMenu__inventory__blockList">
            {playerPotions.map((potion, index) => {
              return (
                  <div className="gameContentMenu__inventory__blockList__item" key={index} onClick={() => onButtonClick('potion', potion, index)}>
                    <div className="gameContentMenu__inventory__blockList__itemImg">
                      <img src={potion.img} alt=""/>
                    </div>
                  </div>
              )
            })}
          </div>
        </div>
        <div className="gameContentMenu__inventory__block">
          <div className="gameContentMenu__inventory__blockHeader">
            Улучшения
          </div>
          <div className="gameContentMenu__inventory__blockList gameContentMenu__inventory__blockList__upgrades">
            {playerUpgrades.map((item, index) => {
              return (
                  <div className="gameContentMenu__inventory__blockList__item" key={index} onClick={() => onButtonClick('upgrade', item, index)}>
                    <div className="gameContentMenu__inventory__blockList__itemImg">
                      <img src={item.img} alt=""/>
                    </div>
                  </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}