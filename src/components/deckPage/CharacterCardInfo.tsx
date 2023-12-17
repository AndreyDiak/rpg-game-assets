import { Modal, Popover, Progress } from "antd";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CharacterType } from "../../redux/characters-reducer";
import { cardLevelUpThunk, profileActions } from "../../redux/profile-reducer";
import { AppStateType } from "../../redux/store";
import { subtractionOfTwoNumbers } from "../../utils/mathsExpressions";
import commonBorder from './../../img/cards/Cards_color1/Civilian_card_version1/Civilian_card_version1.png';
import paper from './../../img/cards/Cards_color1/Civilian_card_version1/details/paper_shadow.png';
import commonTape from './../../img/cards/Cards_color1/Civilian_card_version1/details/tape_top.png';
import rareBorder from './../../img/cards/Cards_color2/Civilian_version1/Civilian_card_version1.png';
import rareTape from './../../img/cards/Cards_color2/Civilian_version1/details/tape_top.png';
import epicBorder from './../../img/cards/Cards_color3/Civilian_card_version1/Civilian_card_version1.png';
import epicTape from './../../img/cards/Cards_color3/Civilian_card_version1/details/tape_top.png';
import silver from './../../img/silver_coin.svg';
import armor from "./../../img/types/armor.png";
import damage from "./../../img/types/damage.png";
import hp from "./../../img/types/hp.png";

export type CharacterCardInfoType = {
  character: CharacterType,
  isCardInfoShown: boolean,
  setIsCardInfoShown: (isShown: boolean) => void
  setIsCardReplaced: (isCardReplaced: boolean) => void
}

export const CharacterCardInfo :FC<CharacterCardInfoType> = React.memo(({character, isCardInfoShown, setIsCardInfoShown, setIsCardReplaced}) => {
  // создаем цвета для подсветки характеристик персонажа . . .

  const playerDeck = useSelector((state: AppStateType) => state.profile.deck.cards) as CharacterType[]
  const cardsToUp = useSelector((state: AppStateType) => state.app.cardsToUp)
  const statsToUp = useSelector((state: AppStateType) => state.app.statsToUp)
  const [isCardLevelUp, setIsCardLevelUp] = useState(false)
  const dispatch = useDispatch()

  const characterMaxLevel = character && cardsToUp.filter(stat => stat.type === character.rarity)[0].cards.length
  // так как уровень перса всегда на 1 больше чем индекс массива, + мы выводим инфу после апа перса...

  const characterImproveStats = 
  character && 
  character.level <= characterMaxLevel && 
  statsToUp.filter(stat => stat.type === character.type)[0].improve[character.level - 2] 

  const characterCostToUp = 
  character && 
  character.level < characterMaxLevel && 
  cardsToUp.filter(type => type.type === character.rarity)[0].cards[character.level - 1].cost

  let charactersCardsNeedToUp = 0
  
  character && console.log('max ' + characterMaxLevel + ' current ' + character.level)

  const damageColorUp = character && characterImproveStats
    ? (character.damage + characterImproveStats.damage) < 3
      ? '#DC143C'
      : (character.damage + characterImproveStats.damage) < 7
        ? '#FF4500'
        : '#32CD32' : ''

  const damageColor = character
    ? character.damage < 3
      ? '#DC143C'
      : character.damage < 7
        ? '#FF4500'
        : '#32CD32' : ''

  const armorColor = character
    ? character.armor < 3
      ? '#DC143C'
      : character.armor < 7
        ? '#FF4500'
        : '#32CD32' : ''

  const armorColorUp = character && characterImproveStats
    ? (character.armor + characterImproveStats.armor) < 3
      ? '#DC143C'
      : (character.armor + characterImproveStats.armor) < 7
        ? '#FF4500'
        : '#32CD32' : ''

  const hpColor = character
    ? character.hp < 3
      ? '#DC143C'
      : character.hp < 7
        ? '#FF4500'
        : '#32CD32' : ''

  const hpColorUp = character && characterImproveStats
    ? (character.hp + characterImproveStats.hp) < 3
      ? '#DC143C'
      : (character.hp + characterImproveStats.hp) < 7
        ? '#FF4500'
        : '#32CD32' : ''

  if (character) {
    cardsToUp.forEach((card, index) => {
      if (card.type === character.rarity) {
        charactersCardsNeedToUp = card.cards[character.level - 1].count
      }
    })
  }

  const onModalClose = () => {
    setIsCardInfoShown(false)
    setIsCardLevelUp(false)
  }

  const onButtonClick = (characterCostToUp: number | false) => {
    setIsCardLevelUp(() => true)
    dispatch(cardLevelUpThunk(character.name, charactersCardsNeedToUp))
    // @ts-ignore
    dispatch(profileActions.addCurrencyToProfile('silver', - characterCostToUp ))
    // dispatch(profileActions.cardLevelUp(character.name, charactersCardsNeedToUp))
  }

  return (
    <>
      {character
        ? <>
          <Modal
            title={character.name}
            visible={isCardInfoShown}
            onOk={onModalClose}
            onCancel={onModalClose}
            footer={null}
            bodyStyle={{padding: '0px'}}
            width={470}
          >
            <div className="cardInfo darken darken-4" style={!isCardLevelUp ? {display: 'grid'} : {display: 'flex'} }>
              {!isCardLevelUp 
                ? <>
                  <div className="cardInfo__img">
                    <div className="cardInfo__imgAvatar">
                      <img src={character.img} alt="" />
                    </div>
                    <div className="cardInfo__imgBorder">
                      <img src={character.rarity === 'common'
                        ? commonBorder
                        : `${character.rarity === 'rare'
                          ? rareBorder : epicBorder}`} alt="" />
                    </div>
                    {
                      // @ts-ignore
                      (character.type === 'support' || character.type === 'spy') && character?.skill.about
                      &&<Popover content={character.skill.about} title="">
                        <div className="cardInfo__imgSkill">
                          <img src={character.skill.img} alt=""/>
                        </div>
                      </Popover>
                    }

                  </div>
                  <div className="cardInfo__stats">
                    <div className="cardInfo__statsImg">
                      <img src={paper} alt=""/>
                    </div>
                    <div className="cardInfo__stat">
                      Урон
                      <div>
                        <div className="cardInfo__statValue" style={{color: damageColor}}>
                          {character.damage}
                        </div>
                        <div className="cardInfo__statImg"><img src={damage} alt=""/></div>
                      </div>
                    </div>
                    <div className="cardInfo__stat">
                      Броня
                      <div>
                        <div className="cardInfo__statValue" style={{color: armorColor}}>
                          {character.armor}
                        </div>
                        <div className="cardInfo__statImg"><img src={armor} alt=""/></div>
                      </div>
                    </div>
                    <div className="cardInfo__stat">
                      Здоровье
                      <div>
                        <div className="cardInfo__statValue" style={{color: hpColor}}>
                          {character.hp}
                        </div>
                        <div className="cardInfo__statImg"><img src={hp} alt=""/></div>
                      </div>
                    </div>
                  </div>
                  <div className="cardInfo__about">
                    <div className="cardInfo__aboutImg">
                      <img src={character.rarity === 'common' ? commonTape : character.rarity === 'rare' ? rareTape : epicTape} alt=""/>
                    </div>
                    <div className="cardInfo__aboutRarity">
                      {character.rarity[0].toUpperCase() + character.rarity.substring(1)}
                    </div>
                    <div className="cardInfo__aboutType">
                      {character.type[0].toUpperCase() + character.type.substring(1)}
                    </div>
                  </div>
                  <div className="cardInfo__level">
                    Level {character.level} <br/>
                    {
                      (characterMaxLevel > character.level) && 
                      <>
                        <Progress
                          percent={100 * (character.count / charactersCardsNeedToUp)}
                          steps={charactersCardsNeedToUp}
                          size={"default"}
                          showInfo={false}
                          strokeColor="#52c41a"
                        />
                        <br/>
                        {charactersCardsNeedToUp < character.count &&
                        <button onClick={() => onButtonClick(characterCostToUp)}>
                          {characterCostToUp} <img src={silver} style={{width: '25px'}} alt=""/>
                        </button> 
                        }
                      </>
                    }
    
                  </div>
                  <div className="cardInfo__history">
                    {character.about}
                  </div>ь
                  {
                    playerDeck.some(d => d.name === character.name)
                      ? ''
                      : <div className="cardInfo__button">
                        <button onClick={() => {
                          setIsCardInfoShown(false)
                          setIsCardReplaced(true)
                        }}>
                          Выбрать
                        </button>
                      </div>
                  }
                </>
                : <>
                  <div className="cardInfo__upgrade">
                    <div className="cardInfo__upgradeHeader">
                      <span>Поздравляем</span>
                    </div>
                    <div className="cardInfo__upgradeContent">
                      <div className="cardInfo__upgradeContent__block">
                        <div className="cardInfo__upgradeContent__blockPrev" style={{color: damageColor}}>
                          <div>
                            {/*  TODO подумать как сделать по человечески... */}
                            {/* @ts-ignore */}
                            {subtractionOfTwoNumbers(character.damage, characterImproveStats.damage )}
                          </div>
                          <div>
                            <img src={damage} alt=""/>
                          </div>
                        </div>
                        <div className="cardInfo__upgradeContent__blockArrow">&#10144;</div>
                        <div className="cardInfo__upgradeContent__blockNext" style={{color: damageColorUp}}>
                          {character.damage}
                          <div>
                            <img src={damage} alt=""/>
                          </div>
                        </div>
                      </div>
                      <div className="cardInfo__upgradeContent__block">
                        <div className="cardInfo__upgradeContent__blockPrev" style={{color: hpColor}}>
                          <div>
                            {/* @ts-ignore */}
                            {subtractionOfTwoNumbers(character.hp, characterImproveStats.hp )}
                          </div>
                          <div>
                            <img src={hp} alt=""/>
                          </div>
                        </div>
                        <div className="cardInfo__upgradeContent__blockArrow">&#10144;</div>
                        <div className="cardInfo__upgradeContent__blockNext" style={{color: hpColorUp}}>
                          {character.hp}
                          <div>
                            <img src={hp} alt=""/>
                          </div>
                        </div>
                      </div>
                      <div className="cardInfo__upgradeContent__block">
                        <div className="cardInfo__upgradeContent__blockPrev" style={{color: armorColor}}>
                          <div>
                            {/* @ts-ignore */}
                            {subtractionOfTwoNumbers(character.armor, characterImproveStats?.armor )}
                          </div>
                          <div>
                            <img src={armor} alt=""/>
                          </div>
                        </div>
                        <div className="cardInfo__upgradeContent__blockArrow">&#10144;</div>
                        <div className="cardInfo__upgradeContent__blockNext" style={{color: armorColorUp}}>
                          {character.armor}
                          <div>
                            <img src={armor} alt=""/>
                          </div>
                        </div>
                      </div>
                      <div className="cardInfo__upgradeContent__img">
                        <img src={paper} alt=""/>
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>
          </Modal>
        </>
        : ' '
      }
    </>
  )
})