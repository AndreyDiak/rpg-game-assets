import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { ActiveFilterType } from "../../pages/ForgePage"
import { MetalType } from "../../redux/forge-reducer"
import { AppStateType } from "../../redux/store"
import { RenderItems } from "./RenderItems"

export const RenderCraftChange: FC<{activeFilter: ActiveFilterType}> = ({activeFilter}) => {

  const metals = useSelector((state: AppStateType) => state.forgePage.metalsList)
  const conversion = useSelector((state: AppStateType) => state.forgePage.conversion)
  const [activeItem, setActiveItem] = useState({} as MetalType)

  console.log(activeItem)

  return (
    <>
      <div className="forgeContent__craftBlock__change">
        <div className="forgeContent__craftBlock__changeHeader">{conversion.about}</div>
        <RenderItems activeFilter={activeFilter} list={metals} setActiveItem={setActiveItem}/>
        {activeItem 
          ? <div>
              <div><b>{activeItem.name}</b></div>
              <div>{activeItem.about}</div>
              
              <div>
                {activeItem.level > 1
                ? <>
                    {conversion.amount}
                    <img src={metals[activeItem.level - 2].metalImg} alt="" />
                    --{">"}
                    <img src={activeItem.metalImg} alt="" />
                  </> 
                : <>
                  <img src={activeItem.metalImg} alt="" />
                  Можно получить проходя уровни
                </>}
              </div>
            </div> 
          : ''
        }
      </div>
    </>
  )
}