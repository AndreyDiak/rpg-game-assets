import { FC } from "react"
import { useSelector } from "react-redux"
import { ActiveFilterType } from "../../pages/ForgePage"
import { AppStateType } from "../../redux/store"

type RenderItemsType = {
  activeFilter: ActiveFilterType, 
  list: any[],
  setActiveItem: (activeItem: any) => void
}

export const RenderItems: FC<RenderItemsType> = ({activeFilter, list, setActiveItem}) => {

  const setList = useSelector((state: AppStateType) => state.forgePage.setList)

  return (
    <>
      <div className="forgeContent__metalsList">
      {list.map((item, index) => {
          return (
            <div className="forgeContent__metalsList__item">
              <div className="forgeContent__metalsList__itemImg" onClick={() => setActiveItem(item)}>
                {activeFilter === 'change' && <img src={item.metalImg} alt="" /> }
                {activeFilter === 'shard' && <img src={item.shardImg} alt="" /> }
                {activeFilter === 'shield' && <img src={item.shield.img} alt="" /> }
                {activeFilter === 'armor' && <img src={item.armor.img} alt="" /> }
                {activeFilter === 'weapon' && <img src={item.weapon.img} alt="" /> }
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}