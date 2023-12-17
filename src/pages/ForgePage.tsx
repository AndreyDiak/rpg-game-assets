import { useState } from "react"
import { useSelector } from "react-redux"
import { RenderCraft } from "../components/forgePage/RenderCraft"
import { AppStateType } from "../redux/store"

export type ActiveFilterType = 'none' | 'change' | 'shard' | 'armor' | 'shield' | 'weapon'  

export const ForgePage = () => {

  const [activeItem, setActiveItem] = useState({})
  const [activeFilter, setActiveFilter] = useState('none' as ActiveFilterType)

  const inventory = useSelector((state: AppStateType) => state.profile.inventory.items)
  const setList = useSelector((state: AppStateType) => state.forgePage.setList)

  const crafts = ['shard', 'armor', 'shield', 'weapon', 'change']

  return (
    <>
      <div className="forge">
        <div className="forgeContent">
          <div className="forgeContent__active">

          </div>
          <div className="forgeContent__metals">
            {/* <RenderMetals /> */}
          </div>
          <div className="forgeContent__craft">
            <div className="forgeContent__craftMenu">
              {crafts.map(craft => {
                return (
                  <>
                    <div className="forgeContent__craftMenu__item">
                      {/*  @ts-ignore */}
                      <button className="buttonBrown" onClick={() => setActiveFilter(craft)}>
                        {craft}
                      </button>
                    </div>
                  </>
                )
              })}
            </div>
            <RenderCraft activeFilter={activeFilter} />
          <div className="forgeContent__inventory">
            
          </div>
        </div>
      </div>
      </div>
    </>
  )
}