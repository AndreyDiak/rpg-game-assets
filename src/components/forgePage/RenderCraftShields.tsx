import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { ActiveFilterType } from "../../pages/ForgePage"
import { SetType } from "../../redux/forge-reducer"
import { AppStateType } from "../../redux/store"
import { RenderItems } from "./RenderItems"

export const RenderCraftShields: FC<{activeFilter: ActiveFilterType}> = ({activeFilter}) => {

  const setList = useSelector((state: AppStateType) => state.forgePage.setList)
  const cost = useSelector((state: AppStateType) => state.forgePage.costsToUp).filter(item => item.type === 'shield')[0]
  const metals = useSelector((state: AppStateType) => state.forgePage.metalsList)
  const [activeItem, setActiveItem] = useState({} as SetType)

  return (
    <>
      <div className="forgeContent__craftBlock__shield">
        <div className="forgeContent__craftBlock__changeHeader">Скрафтить щит</div>
        <RenderItems activeFilter={activeFilter} list={setList} setActiveItem={setActiveItem}/>
        {activeItem.level ? 
          <div>
            {cost.amount}
            <img src={metals[activeItem.level - 1].shardImg} alt="" />
            --{">"}
            <img src={activeItem.shield.img} alt="" />
          </div> 
        : ''}    
      </div>      
    </>
  )
}