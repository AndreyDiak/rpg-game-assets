import {AppStateType, InferActionType} from "./store";
import {ThunkAction} from "redux-thunk";

import common from './../img/chests/chest_common.png'
import rare from './../img/chests/chest_rare.png'
import epic from './../img/chests/chest_epic.png'
import legendary from './../img/chests/chest_legendary.png'
import {CharacterType} from "./characters-reducer";

const OPEN_CHEST = 'shopPage/OPEN_CHEST'
const SET_LOOT_ROAD = 'shopPage/SET_LOOT_ROAD'
const SET_LOOT_OBJECT = 'shopPage/SET_LOOT_OBJECT'
const SET_BONUSES = 'shopPage/SET_BONUSES'

const SET_IS_CURRENCY_TAKEN = 'shopPage/SET_IS_CURRENCY_TAKEN'
const SET_IS_BONUS_CARD_TAKEN = 'shopPage/SET_IS_BONUS_CARD_TAKEN'
const SET_IS_RANDOM_CARD_TAKEN = 'shopPage/SET_IS_RANDOM_CARD_TAKEN'

let initialState = {
  chests: [
    {
      type: 'common' as ChestsRarityType,
      cost: 790,
      costType: 'silver' as ChestsCostType,
      img: common,
      lootChance: [
        {type: 'silver', chance: 50, minCount: 300, maxCount: 1500},
        {type: 'gold',   chance: 20, minCount: 30,  maxCount: 150},
        {type: 'gem',    chance: 10, minCount: 3,   maxCount: 15},
        {type: 'common', chance: 12, minCount: 1,   maxCount: 3},
        {type: 'rare',   chance: 6,  minCount: 1,   maxCount: 2},
        {type: 'epic',   chance: 2,  minCount: 1,   maxCount: 1}
      ]
    },
    {
      type: 'rare' as ChestsRarityType,
      cost: 8990,
      costType: 'silver' as ChestsCostType,
      img: rare,
      lootChance: [
        {type: 'silver', chance: 40, minCount: 3000, maxCount: 15000},
        {type: 'gold',   chance: 20, minCount: 300,  maxCount: 1500},
        {type: 'gem',    chance: 10, minCount: 30,   maxCount: 150},
        {type: 'common', chance: 15, minCount: 3,    maxCount: 5},
        {type: 'rare',   chance: 10, minCount: 2,    maxCount: 3},
        {type: 'epic',   chance: 5,  minCount: 1,    maxCount: 2}
      ]
    },
    {
      type: 'epic' as ChestsRarityType,
      cost: 890,
      costType: 'gold' as ChestsCostType,
      img: epic,
      lootChance: [
        {type: 'silver', chance: 40, minCount: 5000, maxCount: 18000},
        {type: 'gold',   chance: 20, minCount: 500,  maxCount: 1200},
        {type: 'gem',    chance: 10, minCount: 50,   maxCount: 200},
        {type: 'common', chance: 15, minCount: 5,    maxCount: 8},
        {type: 'rare',   chance: 10, minCount: 3,    maxCount: 4},
        {type: 'epic',   chance: 5,  minCount: 1,    maxCount: 3}
      ]
    },
    {
      type: 'legendary' as ChestsRarityType,
      cost: 390,
      costType: 'gem' as ChestsCostType,
      img: legendary,
      lootChance: [
        {type: 'common', chance: 60,  minCount: 8,   maxCount: 12},
        {type: 'rare',   chance: 30,  minCount: 5,   maxCount: 8},
        {type: 'epic',   chance: 10,  minCount: 2,   maxCount: 4}
      ]
    }
  ] as ChestType[],
  lootRoad: [] as ChestLootRarityType[],
  lootRoadLength: 50,
  lootRoadWinNumber: 0,
  lootObject: {
    type: '' as ChestLootRarityType,
    count: 0,
    person: {} as CharacterType
  },
  bonusList: {
    randomCards: [
      {type: 'common', minCount: 3, maxCount: 10, cost: 1000, name: '', count: 0, taken: false},
      {type: 'rare',   minCount: 2, maxCount: 5,  cost: 2000, name: '', count: 0, taken: false},
      {type: 'epic',   minCount: 1, maxCount: 3,  cost: 3000, name: '', count: 0, taken: false}
    ],
    bonusCards: [
      {type: 'common', minCount: 3, maxCount: 6,  cost: 1500, name: '', count: 0, taken: false},
      {type: 'rare',   minCount: 2, maxCount: 4,  cost: 3000, name: '', count: 0, taken: false},
      {type: 'epic',   minCount: 1, maxCount: 2,  cost: 4500, name: '', count: 0, taken: false}
    ],
    bonusCurrency: [
      {type: 'silver' as ChestsCostType, minCount: 650, maxCount: 1200, count: 0, taken: false},
      {type: 'gold' as ChestsCostType,   minCount: 80,  maxCount: 200,  count: 0, taken: false},
    ]
  },
  tradeList: {
    silverTrade: [
      {toGive: 19,  toTake: 500},
      {toGive: 49,  toTake: 1500},
      {toGive: 99,  toTake: 7000},
      {toGive: 199, toTake: 20000}
    ],
    goldTrade: [
      {toGive: 19, toTake: 125},
      {toGive: 49, toTake: 450},
      {toGive: 99, toTake: 1000},
      {toGive: 199, toTake: 2500}
    ]
  },
  isBonusSet: false
}

export type InitialShopStateType = typeof initialState

export const shopReducer = (state = initialState, action: ShopActionType): InitialShopStateType => {
  switch (action.type) {

    case SET_LOOT_ROAD:
      return {
        ...state,
        lootRoad: action.lootRoad,
        lootRoadWinNumber: action.lootRoadWinNumber
      }

    case SET_LOOT_OBJECT:
      return {
        ...state,
        lootObject: action.lootObject
      }

    case SET_BONUSES:
      return {
        ...state,
        bonusList: {
          ...state.bonusList,
          randomCards: action.randomCardsCopy,
          bonusCards: action.bonusCardsCopy,
          bonusCurrency: action.bonusCurrencyCopy
        }
      }

    case SET_IS_CURRENCY_TAKEN:
      return {
        ...state,
        bonusList: {
          ...state.bonusList,
          bonusCurrency: state.bonusList.bonusCurrency.map((currency, index) => {
            if (index === action.index)
              return {
                ...currency,
                taken: true
              }
            return currency
          })
        }
      }

    case SET_IS_BONUS_CARD_TAKEN:
      return {
        ...state,
        bonusList: {
          ...state.bonusList,
          bonusCards: state.bonusList.bonusCards.map((bonus, index) => {
            if (index === action.index)
              return {
                ...bonus,
                taken: true
              }
            return bonus
          })
        }
      }

    case SET_IS_RANDOM_CARD_TAKEN:
      return {
        ...state,
        bonusList: {
          ...state.bonusList,
          randomCards: state.bonusList.randomCards.map((random, index) => {
            if (index === action.index)
              return {
                ...random,
                taken: true
              }
            return random
          })
        }
      }

    default:
      return state
  }
}

export const shopActions = {
  setLootRoad: (lootRoad: ChestLootRarityType[], lootRoadWinNumber: number) => ({type: SET_LOOT_ROAD, lootRoad, lootRoadWinNumber} as const),
  setLootObject: (lootObject: LootObjectType) => ({type: SET_LOOT_OBJECT, lootObject} as const),
  openChest: (chestType: ChestsRarityType) => ({type: OPEN_CHEST, chestType} as const),
  setBonuses: (randomCardsCopy: [], bonusCardsCopy: [], bonusCurrencyCopy: []) => ({type: SET_BONUSES, randomCardsCopy, bonusCardsCopy, bonusCurrencyCopy} as const),
  setIsCurrencyTaken: (index: number) => ({type: SET_IS_CURRENCY_TAKEN, index} as const),
  setIsBonusCardTaken: (index: number) => ({type: SET_IS_BONUS_CARD_TAKEN, index} as const),
  setIsRandomCardTaken: (index: number) => ({type: SET_IS_RANDOM_CARD_TAKEN, index} as const),
}

export const openChestThunk = (chest: ChestType): ShopThunkType => (dispatch, getState) => {

  let lootRoadLengthCopy = getState().shopPage.lootRoadLength
  // создаем массив где будет лут . . .
  let lootRoadCopy = Array(lootRoadLengthCopy).fill('') as ('' | ChestLootRarityType)[]
  // пробегаемся по массиву . . .
  let lootRoadWinNumber = Math.floor(Math.random() * 10 + 34)

  if (chest.type === 'legendary') {
    for (let i = 0; i < lootRoadLengthCopy; i++) {
      // создаем шанс ...
      let lootChance = Math.floor(Math.random() * 100)
      lootChance < chest.lootChance[0].chance
        ? lootRoadCopy[i] = chest.lootChance[0].type : lootChance > (100 - chest.lootChance[2].chance)
          ? lootRoadCopy[i] = chest.lootChance[2].type : lootRoadCopy[i] = chest.lootChance[1].type
    }
  } else {
    for (let i = 0; i< lootRoadLengthCopy; i++) {
      // создаем шанс ...

      let silverChance = chest.lootChance[0].chance
      let goldChance = silverChance + chest.lootChance[1].chance
      let gemChance = goldChance + chest.lootChance[2].chance
      let commonChance = gemChance + chest.lootChance[3].chance
      let rareChance = commonChance + chest.lootChance[4].chance

      let lootChance = Math.floor(Math.random() * 100)

      // console.log(lootChance)

      if (lootChance < silverChance) lootRoadCopy[i] = 'silver'
      if (lootChance >= silverChance && lootChance < goldChance) lootRoadCopy[i] = 'gold'
      if (lootChance >= goldChance &&   lootChance < gemChance) lootRoadCopy[i] = 'gem'
      if (lootChance >= gemChance && lootChance < commonChance) lootRoadCopy[i] = 'common'
      if (lootChance >= commonChance && lootChance < rareChance ) lootRoadCopy[i] = 'rare'
      if (lootChance >= rareChance) lootRoadCopy[i] = 'epic'

      // console.log(lootRoadCopy[i])

    }
  }

  let lootObjectCopy = {
    type: lootRoadCopy[lootRoadWinNumber],
    count: 0,
    person: {} as CharacterType
  }

  // если выпала сера, золото или гемы . . .
  if (lootObjectCopy.type === 'silver' || lootObjectCopy.type === 'gold' || lootObjectCopy.type === 'gem') {
    chest.lootChance.forEach((loot, index) => {
      if (loot.type === lootObjectCopy.type) {
        lootObjectCopy.count = Math.floor(Math.random() * (loot.maxCount - loot.minCount) + loot.minCount)
      }
    })
  } else {
    // если выпал персонаж . . .
    console.log(getState().characters.charactersList)
    let charactersCopy = [...getState().characters.charactersList.filter(p => p.rarity === lootObjectCopy.type)]
    console.log('copy')
    console.log(charactersCopy)
    chest.lootChance.forEach((loot, index) => {
      // находим нужный тип персонажа . . .
      if (loot.type === lootObjectCopy.type) {
        // количество выпадших карт . . .
        lootObjectCopy.count = Math.floor(Math.random() * (loot.maxCount - loot.minCount) + loot.minCount)
        // выбираем рандомного персонажа из списка персов . . .
        let randomCharacterIndex = Math.floor(Math.random() * charactersCopy.length)
        // копируем карточку персонажа . . .
        lootObjectCopy.person = {...charactersCopy[randomCharacterIndex]}
        // TODO разобраться почему эта ошибка так сильно влияет
        lootObjectCopy.person.count = lootObjectCopy.count
      }
    })
  }

  // @ts-ignore
  dispatch(shopActions.setLootRoad(lootRoadCopy, lootRoadWinNumber))

  // @ts-ignore
  dispatch(shopActions.setLootObject(lootObjectCopy))
  console.log(lootObjectCopy.person)

}

export const setBonusesThunk = (): ShopThunkType => (dispatch, getState) => {
  // список бонусов . . .
  let bonusListCopy = {...getState().shopPage.bonusList}
  // список персонажей . . .
  let charactersCopy = [...getState().characters.charactersList]

  // let isBonusSet = getState().shopPage.isBonusSet
  // копия рандомны карт . . .
  let randomCardsCopy = [...bonusListCopy.randomCards]
  // копия бонусов для покупки карт
  let bonusCardsCopy = [...bonusListCopy.bonusCards]
  // копия бонусов с монетами . . .
  let bonusCurrencyCopy = [...bonusListCopy.bonusCurrency]

  randomCardsCopy.forEach((randomCard, index) => {
    let filteredCharacters = charactersCopy.filter(character => character.rarity === randomCard.type)

    randomCardsCopy[index].count = Math.floor(Math.random() * (randomCard.maxCount - randomCard.minCount) + randomCard.minCount)
    randomCardsCopy[index].name = filteredCharacters[ Math.floor(Math.random() * filteredCharacters.length) ].name
  })

  bonusCardsCopy.forEach((bonusCard, index) => {
    let filteredCharacters = charactersCopy.filter(character => character.rarity === bonusCard.type)

    bonusCardsCopy[index].count = Math.floor(Math.random() * (bonusCard.maxCount - bonusCard.minCount) + bonusCard.minCount)
    bonusCardsCopy[index].name = filteredCharacters[ Math.floor(Math.random() * filteredCharacters.length) ].name
  })

  bonusCurrencyCopy.forEach((bonusCurrency, index) => {
    bonusCurrencyCopy[index].count = Math.floor(Math.random() * (bonusCurrency.maxCount - bonusCurrency.minCount) + bonusCurrency.minCount)
  })
  // @ts-ignore . . .
  dispatch(shopActions.setBonuses(randomCardsCopy, bonusCardsCopy, bonusCurrencyCopy))

}

export type LootObjectType = {
  type: ChestLootRarityType
  count: number
  person: CharacterType
}
type ChestsRarityType = 'common' | 'rare' | 'epic' | 'legendary'
export type ChestsCostType = 'silver' | 'gold' | 'gem'
type ChestsLootType = {
  type: ChestLootRarityType
  chance: number
  minCount: number
  maxCount: number
}
type ChestLootRarityType = 'silver' | 'gold' | 'gem' | 'common' | 'rare' | 'epic'
export type ChestType = {
  type: ChestsRarityType
  cost: number
  costType: ChestsCostType
  img: string
  lootChance: ChestsLootType[]
}
type ShopActionType = InferActionType<typeof shopActions>
type ShopThunkType = ThunkAction<any, AppStateType, unknown, ShopActionType>