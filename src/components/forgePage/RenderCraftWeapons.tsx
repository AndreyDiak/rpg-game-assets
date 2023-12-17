import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { ActiveFilterType } from "../../pages/ForgePage"
import { AppStateType } from "../../redux/store"
import { RenderItems } from "./RenderItems"

type ActiveItemType = {
  level: number
  weapon: {
    type: WeaponType
    img: string
    damage: number
  }
}

type WeaponType = 'long' | 'magic' | 'melee' | 'support'

export const RenderCraftWeapons: FC<{activeFilter: ActiveFilterType}> = ({activeFilter}) => {
  
  const [activeArmorType, setActiveArmorType] = useState('' as WeaponType)
  const [activeItem, setActiveItem] = useState({} as ActiveItemType)

  const setList = useSelector((state: AppStateType) => state.forgePage.setList)
  const costsToUp = useSelector((state: AppStateType) => state.forgePage.costsToUp)
  const metals = useSelector((state: AppStateType) => state.forgePage.metalsList)

  return (
    <>
      <div className="forgeContent__craftBlock__weapon">
        <div className="forgeContent__craftBlock__weaponHeader"></div>
          <div>
                {setList[1].weapon.map((item, index) => {
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
                    <RenderItems activeFilter={activeFilter} list={[...setList.map(set => {return {level: set.level, weapon: set.weapon.filter(weapon => weapon.type === activeArmorType)[0]}})]} setActiveItem={setActiveItem}/>
                  </div>
                }
                { 
                  // @ts-ignore
                  activeItem.level > 0 &&
                  <div>
                    {costsToUp.filter(cost => cost.type === activeItem.weapon.type)[0].amount}
                    <img src={metals[activeItem.level - 1].shardImg} alt="" />
                    --{">"}
                    <img src={activeItem.weapon.img} alt="" />
                  </div>
                }
              </div>
            </div>
    </>
  )
}