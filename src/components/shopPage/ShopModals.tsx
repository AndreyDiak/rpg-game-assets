import {ChestInfo} from "./ChestInfo";
import {ChestOpen} from "./ChestOpen";
import {FC} from "react";
import {ChestType} from "../../redux/shop-reducer";

type ShopModalsType = {
  chest: ChestType | null
  isChestInfoShown: boolean
  setIsChestInfoShown: (isChestInfoShown: boolean) => void
  isChestOpened: boolean
  setIsChestOpened: (isChestOpened: boolean) => void
}

export const ShopModals: FC<ShopModalsType> = ({chest, isChestInfoShown, isChestOpened, setIsChestInfoShown, setIsChestOpened}) => {
  return (
    <>
      {/* @ts-ignore модалка с информацией о сундуке . . . */}
      <ChestInfo chest={chest} isChestInfoShown={isChestInfoShown} setIsChestInfoShown={setIsChestInfoShown} setIsChestOpened={setIsChestOpened}/>
      {/* @ts-ignore модалка с открытием сундука . . . */}
      <ChestOpen activeChest={chest} isChestOpened={isChestOpened} setIsChestOpened={setIsChestOpened} />
    </>
  )
}