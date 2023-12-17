import { FC } from "react"
import { useSelector } from "react-redux"
import { ActiveFilterType } from "../../pages/ForgePage"
import { AppStateType } from "../../redux/store"
import { RenderCraftArmor } from "./RenderCraftArmor"
import { RenderCraftChange } from "./RenderCraftChange"
import { RenderCraftShards } from "./RenderCraftShards"
import { RenderCraftShields } from "./RenderCraftShields"
import { RenderCraftWeapons } from "./RenderCraftWeapons"

export const RenderCraft: FC<{activeFilter: ActiveFilterType}> = ({activeFilter}) => {

  const change = useSelector((state: AppStateType) => state.forgePage.conversion)

  return (
    <>
      <div className="forgeContent__craftBlock">
        { activeFilter === 'change' && <RenderCraftChange activeFilter={activeFilter} /> }
        { activeFilter === 'shard' && <RenderCraftShards activeFilter={activeFilter} /> }
        { activeFilter === 'shield' && <RenderCraftShields activeFilter={activeFilter} /> }
        { activeFilter === 'armor' && <RenderCraftArmor activeFilter={activeFilter} /> }
        { activeFilter === 'weapon' && <RenderCraftWeapons activeFilter={activeFilter} /> }
      </div>
    </>
  )
}