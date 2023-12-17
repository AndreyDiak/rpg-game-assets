import { FC } from "react";
import { CharacterType } from "../../redux/characters-reducer";
import { CharacterCard } from "./CharacterCard";

export type RenderCardsType = {
  cards: CharacterType[]
  setActiveCard: (card: CharacterType) => void | null
  setIsCardInfoShown: (isShown: boolean) => void | null
  visible: boolean
  isCardReplaced: boolean
}

export const RenderCards: FC<RenderCardsType> = ({cards, visible, setIsCardInfoShown, setActiveCard, isCardReplaced}) => {
  // const cardsToUp = useSelector((state: AppStateType) => state.app.cardsToUp)
  // количество карт необходимое для апгрейда карты . . .
  // let charactersCardsNeedToUp = 0

  return (
    <>
      <div className="deckList">
          {cards.map((card, index) => {

            return (
              <>
                  <CharacterCard
                    key={index}
                    character={card}
                    setIsCardInfoShown={setIsCardInfoShown}
                    setActiveCard={setActiveCard}
                    visible={visible}
                    isCardReplaced={isCardReplaced}
                  />
              </>
            )
          })}
      </div>
    </>
  )
}