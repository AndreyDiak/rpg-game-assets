import armor1 from './../img/potions/armor_1.png';
import armor2 from './../img/potions/armor_2.png';
import armor3 from './../img/potions/armor_3.png';
import hp1 from './../img/potions/hp_1.png';
import hp2 from './../img/potions/hp_2.png';
import hp3 from './../img/potions/hp_3.png';
import mana1 from './../img/potions/mana_1.png';
import mana2 from './../img/potions/mana_2.png';
import mana3 from './../img/potions/mana_3.png';
import armorUpgrade from './../img/ugrades/armor_upgrade.png';
import damageUpgrade from './../img/ugrades/damage_upgrade.png';
// карты типа "common" имеют 6 уровней
// карты типа "rare" имеют 5 уровней
// карты типа "epic" имеют 4 уровня
import hpUpgrade from './../img/ugrades/hp_upgrade.png';
import { DamageType } from "./characters-reducer";

const SET_IS_LEVEL_STARTED = 'appReducer/SET_IS_LEVEL_STARTED'

let initialState = {
  cardsToUp: [
    {type: 'common',
      cards: [
        {count: 4,   cost: 400},
        {count: 10,  cost: 1000},
        {count: 18,  cost: 2500},
        {count: 30,  cost: 5000},
        {count: 65,  cost: 12000},
        {count: 150, cost: 25000}
      ]
    },
    {
      type: 'rare',
      cards: [
        {count: 3,   cost: 500},
        {count: 7,   cost: 1200},
        {count: 12,  cost: 3000},
        {count: 24,  cost: 7000},
        {count: 50,  cost: 15000},
      ]
    },
    {type: 'epic',
      cards: [
        {count: 2,   cost: 800},
        {count: 4,   cost: 1500},
        {count: 8,   cost: 4000},
        {count: 16,  cost: 10000},
      ]
    }
  ],
  // улучшение статистики при повышении уровня персонажа...
  statsToUp: [
    {
      type: 'melee' as DamageType,
      improve: [
        {damage: 0.2,  hp: 0.40, armor: 1.0},
        {damage: 0.18, hp: 0.30, armor: 0.9},
        {damage: 0.16, hp: 0.25, armor: 0.8},
        {damage: 0.14, hp: 0.20, armor: 0.7},
        {damage: 0.12, hp: 0.15, armor: 0.6},
        {damage: 0.10, hp: 0.10, armor: 0.5},
      ]
    }, {
      type: 'long' as DamageType,
      improve: [
        {damage: 0.5,  hp: 0.20, armor: 0.40},
        {damage: 0.45, hp: 0.18, armor: 0.30},
        {damage: 0.40, hp: 0.16, armor: 0.25},
        {damage: 0.35, hp: 0.14, armor: 0.20},
        {damage: 0.30, hp: 0.12, armor: 0.15},
        {damage: 0.20, hp: 0.10, armor: 0.10},
      ]
    }, {
      type: 'magic' as DamageType,
      improve: [
        {damage: 1.0, hp: 0.35, armor: 0.20},
        {damage: 0.9, hp: 0.30, armor: 0.18},
        {damage: 0.8, hp: 0.25, armor: 0.16},
        {damage: 0.7, hp: 0.20, armor: 0.14},
        {damage: 0.6, hp: 0.15, armor: 0.12},
        {damage: 0.5, hp: 0.10, armor: 0.10},
      ]
    }, {
      type: 'support' as DamageType,
      improve: [
        {damage: 0.3,  hp: 0.5,  armor: 0.30},
        {damage: 0.25, hp: 0.45, armor: 0.25},
        {damage: 0.20, hp: 0.40, armor: 0.20},
        {damage: 0.15, hp: 0.35, armor: 0.15},
        {damage: 0.10, hp: 0.30, armor: 0.10},
        {damage: 0.10, hp: 0.20, armor: 0.10},
      ]
    }, {
      type: 'spy' as DamageType,
      improve: [
        {damage: -0.20, hp: -0.50, armor: -0.16},
        {damage: -0.18, hp: -0.45, armor: -0.14},
        {damage: -0.16, hp: -0.40, armor: -0.12},
        {damage: -0.14, hp: -0.35, armor: -0.10},
        {damage: -0.12, hp: -0.30, armor: -0.08},
        {damage: -0.10, hp: -0.20, armor: -0.05},
      ]
    },
  ],
  // список всяких зелик...
  potionsList: [
    {
      type: 'hp',
      levels: [
        {
          level: 1,
          about: 'Лёгкое зелье, восстанавливает 0.5 ед здроровья',
          img: hp1,
          count: 0.5
        }, {
          level: 2,
          about: 'Среднее зелье, восстанавливает 1 ед здроровья',
          img: hp2,
          count: 1
        }, {
          level: 3,
          about: 'Тяжелое зелье, восстанавливает 1.5 ед здроровья',
          img: hp3,
          count: 1.5
        }
      ]
    },
    {
      type: 'armor',
      levels: [
        {
          level: 1,
          about: 'Лёгкое зелье, восстанавливает 0.5 ед брони',
          img: armor1,
          count: 0.5
        }, {
          level: 2,
          about: 'Среднее зелье, восстанавливает 1 ед брони',
          img: armor2,
          count: 1
        }, {
          level: 3,
          about: 'Тяжелое зелье, восстанавливает 1.5 ед брони',
          img: armor3,
          count: 1.5
        }
      ]
    },
    {
      type: 'damage',
      levels: [
        {
          level: 1,
          about: 'Лёгкое зелье, добавляет к урону 0.2 ед',
          img: mana1,
          count: 0.2
        }, {
          level: 2,
          about: 'Среднее зелье, добавляет к урону 0.4 ед',
          img: mana2,
          count: 0.4
        }, {
          level: 3,
          about: 'Тяжелое зелье, добавляет к урону 0.6 ед',
          img: mana3,
          count: 0.6
        }
      ]
    },
    {
      type: 'mana',
      levels: [
        {
          level: 1,
          about: 'Лёгкое зелье, добавляет к мане 1 ед',
          img: mana1,
          count: 0.5
        }, {
          level: 2,
          about: 'Среднее зелье, добавляет к мане 3 ед',
          img: mana2,
          count: 1
        }, {
          level: 3,
          about: 'Тяжелое зелье, добавляет к мане 3 ед',
          img: mana3,
          count: 1.5
        }
      ]
    }
  ],
  // предметы для улучшение характеристик персонажа ...
  upgradeList: [
    {
      title: 'Увеличение здоровья',
      type: 'hp',
      count: 1.5,
      about: 'Увеличивает запас здоровья героя на 1.5 едениц',
      img: hpUpgrade,
      cost: 30
    },
    {
      title: 'Увеличение брони',
      type: 'armor',
      count: 1.5,
      about: 'Увеличивает запас брони героя на 1.5 едениц',
      img: armorUpgrade,
      cost: 50
    },
    {
      title: 'Увеличение урона',
      type: 'damage',
      count: 1,
      about: 'Увеличивает урон героя на 1 еденицу',
      img: damageUpgrade,
      cost: 70
    }
  ] as UpgradeType[],
  //
  
  isLevelStarted: false
}

export const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_IS_LEVEL_STARTED:
      return {
        ...state,
        isLevelStarted: action.isLevelStarted
      }
    default:
      return state
  }
}

export const appAction = {
  setIsLevelStarted: (isLevelStarted: boolean) => ({type: SET_IS_LEVEL_STARTED, isLevelStarted} as const)
}

export type UpgradeType = {
  title: string
  type: 'hp' | 'armor' | 'damage'
  count: number
  about: string
  img: string
  cost: number
}

export type PotionType = {
  type: 'hp' | 'armor' | 'damage'
  level: number,
  about: string,
  img: string,
  count: number
  amount: number
}

export type ActivePotionType = {
  type: 'hp' | 'armor' | 'damage'
  about: string
  img: string
  count: number
}
