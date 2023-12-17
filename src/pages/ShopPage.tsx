import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RenderBonus } from '../components/shopPage/RenderBonus';
import { RenderChest } from '../components/shopPage/RenderChest';
import { RenderTrade } from '../components/shopPage/RenderTrade';
import { ShopModals } from '../components/shopPage/ShopModals';
import { ChestType } from '../redux/shop-reducer';
import { AppStateType } from '../redux/store';

export function ShopPage() {
  const chests = useSelector((state: AppStateType) => state.shopPage.chests);
  const tradeList = useSelector((state: AppStateType) => state.shopPage.tradeList);

  const [isChestInfoShown, setIsChestInfoShown] = useState(false);
  const [activeChest, setActiveChest] = useState(null as null | ChestType);
  const [isChestOpened, setIsChestOpened] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="shop darken darken-4">
      <div className="shopContent darken darken-6">

        <ShopModals chest={activeChest} isChestInfoShown={isChestInfoShown} setIsChestInfoShown={setIsChestInfoShown} isChestOpened={isChestOpened} setIsChestOpened={setIsChestOpened} />

        <div className="shopContent__header"><span>Сундуки</span></div>
        <div className="shopContent__chests">
          {chests.map((chest, index) => <RenderChest key={index} chest={chest} setActiveChest={setActiveChest} setIsChestInfoShown={setIsChestInfoShown} setIsChestOpened={setIsChestOpened} />)}
        </div>

        <div className="shopContent__header"><span>Предложения</span></div>
        <RenderBonus />

        <div className="shopContent__header"><span>Золото</span></div>
        <RenderTrade tradeList={tradeList.goldTrade} type="gold" />

        <div className="shopContent__header"><span>Серебро</span></div>
        <RenderTrade tradeList={tradeList.silverTrade} type="silver" />
      </div>
    </div>
  );
}
