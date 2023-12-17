import { FC } from "react"
import { useDispatch } from "react-redux"
import { CharacterType } from "./../../redux/characters-reducer"
import { profileActions } from "./../../redux/profile-reducer"

import cardBack from './../../img/cards/Cards_color1/Civilian_card_back/details/Background.png'
import cardBorder from './../../img/cards/Cards_color1/Civilian_card_back/details/main_border.png'
import { CharacterCard } from "./CharacterCard"

export type RenderDeckType = {
  deck: CharacterType[]
  isCardReplaced: boolean
  activeCard: CharacterType
  setIsCardReplaced: (isCardReplaced: boolean) => void
  setIsCardInfoShown: (isCardInfoShown: boolean) => void
  setActiveCard: (activeCard: CharacterType) => void 
}

export const RenderDeck: FC<RenderDeckType> = ({deck, activeCard, isCardReplaced, setIsCardReplaced, setIsCardInfoShown, setActiveCard}) => {

  const dispatch = useDispatch()

  return (
    <div className={`deckField ${isCardReplaced ? 'cardFieldHover' : ''}`}>
      {deck.map((card, index) => {
        return (
          <div className="deckField__block" key={index} onClick={() => {
            if(isCardReplaced) {
              if (!deck.some(d => d.name === activeCard.name))
                dispatch(profileActions.addCardToDeck(index, activeCard))
              setIsCardReplaced(false)
            }
          }}> 
            {!!card.name
              ? <CharacterCard character={card} visible={true} isCardReplaced={isCardReplaced} setIsCardInfoShown={setIsCardInfoShown} setActiveCard={setActiveCard}/>
              : <>
                <div className="deckField__blockBack">
                  <img src={cardBack} alt="" />
                </div>
                <div className="deckField__blockBorder">
                  <img src={cardBorder} alt="" />
                </div>
              </>
            }

          </div>
        )
      })}
    </div>
  )
}