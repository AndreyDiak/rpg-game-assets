import {ChestType} from "../../redux/shop-reducer";
import {FC} from "react";
import {Modal} from "antd";

import silver from './../../img/silver_coin.svg'
import gold from './../../img/gold_coin.svg'
import gem from './../../img/gem.svg'

import commonCard from './../../img/cards/Cards_color1/Civilian_card_back/Civilian_card_back.png'
import rareCard from './../../img/cards/Cards_color2/Civilian_card_back/Civilian_card_back.png'
import epicCard from './../../img/cards/Cards_color3/Civilian_card_back/Civilian_card_back.png'

type ChestInfoType = {
  chest: ChestType
  isChestInfoShown: boolean
  setIsChestInfoShown: (isChestInfoShown: boolean) => void
}

export const ChestInfo: FC<ChestInfoType> = ({chest, isChestInfoShown, setIsChestInfoShown}) => {
  return (
    <>
      <Modal
        title={'Сундук содержит'}
        visible={isChestInfoShown}
        onOk={() => setIsChestInfoShown(false)}
        onCancel={() => setIsChestInfoShown(false)}
        footer={null}
        bodyStyle={{padding: '0px'}}
        width={700}
      >
        {chest
          ? <>
            <div className="chestInfo darken-6 darken">
              <div className="chestInfo__content">
                {chest.lootChance.map((loot, index) => {
                  return (
                    <>
                      <div className="chestInfo__loot">
                        <div className="chestInfo__lootImg">
                          <img src={
                            loot.type === 'silver' ? silver
                              : loot.type === 'gold' ? gold
                                : loot.type === 'gem' ? gem
                                  : loot.type === 'common' ? commonCard
                                    : loot.type === 'rare' ? rareCard
                                      : epicCard} alt=""
                          />
                        </div>
                        <div
                          className="chestInfo__lootTitle"
                          style={loot.type === 'epic' ? {color: '#4B0082', fontSize: '30px'}
                            : loot.type === 'rare' ? {color: '#A52A2A', fontSize: '30px'}
                              : loot.type === 'common' ? {color: '#fff', fontSize: '30px'} : {}}>
                          {loot.minCount} - {loot.maxCount} шт.
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
              <div className="chestInfo__title">
                (Внимание, сундук может содержать только 1 предмет из представленного набора)
              </div>
            </div>
            </>

          : ''}
      </Modal>
    </>
  )
}