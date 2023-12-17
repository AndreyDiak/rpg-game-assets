import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { ActiveFilterType } from "../../pages/ForgePage"
import { AppStateType } from "../../redux/store"
import { RenderItems } from "./RenderItems"

type ActiveItemType = {
  level: number
  armor: {
    type: ArmorType
    img: string
    armor: number
    hp: number
  }
}

type ArmorType = 'helmet' | 'chestplate' | 'leggins' | 'boots'

export const RenderCraftArmor: FC<{activeFilter: ActiveFilterType}> = ({activeFilter}) => {

  const [activeArmorType, setActiveArmorType] = useState('' as ArmorType)
  const [activeItem, setActiveItem] = useState({} as ActiveItemType)

  const setList = useSelector((state: AppStateType) => state.forgePage.setList)
  const costsToUp = useSelector((state: AppStateType) => state.forgePage.costsToUp)
  const metals = useSelector((state: AppStateType) => state.forgePage.metalsList)
  // console.log( setList.map(set => {return {level: set.level,armor: set.armor.filter(armor => armor.type === activeArmorType)[0]}}) )

  // console.log(activeItem)

  return (
    <>
      <div className="forgeContent__craftBlock__armor">
        <div className="forgeContent__craftBlock__armorHeader"></div>
        <div>
          {setList[1].armor.map((item, index) => {
            return (
              <>
                <div onClick={() => setActiveArmorType(item.type)}>
                  <img src={item.img} alt="" />
                </div>
              </>
            )
          })}
          {
            !!activeArmorType && 
            <div>
              <RenderItems activeFilter={activeFilter} list={[...setList.map(set => {return {level: set.level, armor: set.armor.filter(armor => armor.type === activeArmorType)[0]}})]} setActiveItem={setActiveItem}/>
            </div>
          }
          { 
            // @ts-ignore
            activeItem.level > 0 &&
            <div>
              {costsToUp.filter(cost => cost.type === activeItem.armor.type)[0].amount}
              <img src={metals[activeItem.level - 1].shardImg} alt="" />
              --{">"}
              <img src={activeItem.armor.img} alt="" />
            </div>
          }
        </div>
      </div>
    </>
  )
}