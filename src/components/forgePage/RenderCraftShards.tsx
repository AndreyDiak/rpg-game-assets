import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { ActiveFilterType } from "../../pages/ForgePage"
import { MetalType } from "../../redux/forge-reducer"
import { AppStateType } from "../../redux/store"
import { RenderItems } from "./RenderItems"

export const RenderCraftShards: FC<{activeFilter: ActiveFilterType}> = ({activeFilter}) => {

  const metals = useSelector((state: AppStateType) => state.forgePage.metalsList)
  const [activeItem, setActiveItem] = useState({} as MetalType)

  return (
    <>
      <div className="forgeContent__craftBlock__change">
              <div className="forgeContent__craftBlock__changeHeader">Создать осколки</div>
              <RenderItems activeFilter={activeFilter} list={metals} setActiveItem={setActiveItem}/>
              {activeItem.level 
                ? <div>
                    <div><b>{activeItem.name}</b></div>
                    <div>{activeItem.about}</div>
                    
                    <div>
                      2<img src={activeItem.metalImg} alt="" />
                      --{">"}
                      <img src={activeItem.shardImg} alt="" />
                    </div>
                  </div> 
                : ''
              }
            </div>
    </>
  )
}