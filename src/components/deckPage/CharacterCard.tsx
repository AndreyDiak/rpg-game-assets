import { FC } from "react"
import { CharacterType } from "../../redux/characters-reducer"

import commonBorder from './../../img/cards/Cards_color1/Civilian_card_version1/Civilian_card_version1.png'
import rareBorder from './../../img/cards/Cards_color2/Civilian_version1/Civilian_card_version1.png'
import epicBorder from './../../img/cards/Cards_color3/Civilian_card_version1/Civilian_card_version1.png'

import commonClosed from './../../img/cards/Cards_color1/Civilian_card_back/Civilian_card_back.png'
import rareClosed from './../../img/cards/Cards_color2/Civilian_card_back/Civilian_card_back.png'
import epicClosed from './../../img/cards/Cards_color3/Civilian_card_back/Civilian_card_back.png'

import melee from './../../img/types/melee.png'
import support from './../../img/types/support.png'
import magic from './../../img/types/magic.png'
import long from './../../img/types/long.png'
import spy from './../../img/types/spy.png'

import {Popover} from "antd";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

export type CharacterCardType = {
  character: CharacterType
  setActiveCard?: (card: CharacterType) => void | null
  setIsCardInfoShown?: (isShown: boolean) => void | null
  visible?: boolean
  isCardReplaced: boolean
}

export const CharacterCard: FC<CharacterCardType> = ({character, setActiveCard, setIsCardInfoShown, visible, isCardReplaced}) => {

  const cardsToUp = useSelector((state: AppStateType) => state.app.cardsToUp)
  const statsToUp = useSelector((state: AppStateType) => state.app.statsToUp)

  const characterMaxLevel = character && cardsToUp.filter(stat => stat.type === character.rarity)[0].cards.length

  // описание типа войск карты...
  const characterType = character
    ? character.type === 'melee'
      ? 'Воин'
      : character.type === 'long'
        ? 'Лучник'
        : character.type === 'magic'
          ? 'Маг' : character.type === 'support'
            ? 'Саппорт' : 'Шпион'
    : ''

  // количество карт необходимое для апгрейда карты . . .
  let charactersCardsNeedToUp = 0

  if (character) {
    cardsToUp.forEach((card, index) => {
      if (card.type === character.rarity) {
        charactersCardsNeedToUp = card.cards[character.level - 1].count
      }
    })
  }

  return (
    <div className={`character ${visible ? 'characterHover' : ''}`} onClick={() => {
      if (visible && !isCardReplaced) {
        //@ts-ignore
        setActiveCard(character)
        //@ts-ignore
        setIsCardInfoShown(true)
      }
    }}>
      <div className="characterCard">
        {!visible 
          ? <div className="characterClosed">
              <img src={character.rarity === 'common' ? commonClosed : character.rarity === 'rare' ? rareClosed : epicClosed} alt="" />
            </div>
          : ''
        }
        <div className="characterImg">
          <div className="characterImg__avatar">
            <img src={character.img} alt="" />
          </div>
          <div className="characterImg__border">
            <img src={character.rarity === 'common' 
              ? commonBorder
                : `${character.rarity === 'rare' 
              ? rareBorder : epicBorder}`} alt="" />
          </div>
          <Popover content={characterType} title=''>
            <div className="characterImg__type">
              <img src={
                character.type === 'melee' ? melee
                  : character.type === 'long' ? long
                    : character.type === 'magic' ? magic
                      : character.type === 'support' ? support : spy
                  } alt=""/>
            </div>
          </Popover>
          <div className="characterImg__name">
            {character.name}
          </div>
          <div className="characterImg__stats">
            <div className="characterImg__statsLevel">
               Level {character.level}
            </div>
            {character.level >= characterMaxLevel
            ? 'MAX' : character.level === 1
              ? <>
                {character.count > 0
                  ? <div className="characterImg__statsCount">
                    {character.count} / {charactersCardsNeedToUp}
                  </div>
                  : ''
                }
                </>
              : <div className="characterImg__statsCount">
                  {character.count} / {charactersCardsNeedToUp}
                </div>
            }
          </div>
        </div>
      </div>
      
    </div>
  )
}
