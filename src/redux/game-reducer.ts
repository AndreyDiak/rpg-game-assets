import { ThunkAction } from 'redux-thunk';
import { calculateAvailableCells } from '../utils/calculateAvailableCells';
import { calculateAvailableHeroes } from '../utils/calculateAvailableHeroes';
import { checkPlayerUpgradesBoard } from '../utils/checkPlayerUpgrades';
import {
  classDamageCalculation, isArmorOrHpDamageCalculation, supportDamageCalculation, supportProtectionCalculation, takeEnemyDamage
} from '../utils/damageExpression';
import { multiplicationOfTwoNumber, summaryOfTwoNumbers } from '../utils/mathsExpressions';
import { debaffDamageCalculation } from './../utils/damageExpression';
import { ActivePotionType, appAction, UpgradeType } from './app-reducer';
import {
  CharacterType, DamageType, RobbersNamesType, skillType
} from './characters-reducer';
import { LevelType } from './company-reducer';
import { AppStateType, InferActionType } from './store';

const SET_LEVEL_HEADER = 'gameReducer/SET_LEVEL_HEADER';
const SET_ENEMY_DECK = 'gameReducer/SET_ENEMY_DECK';
const SET_PLAYER_DECK = 'gameReducer/SET_PLAYER_DECK';

const SET_ENEMY_ON_BOARD = 'gameReducer/SET_ENEMY_ON_BOARD';
const SET_HERO_ON_BOARD = 'gameReducer/SET_HERO_ON_BOARD';
const SET_SPY_ON_BOARD = 'gameReducer/SET_SPY_ON_BOARD';

const UPDATE_PLAYER_BOARD = 'gameReducer/UPDATE_PLAYER_BOARD';
const SET_ENEMY_DEBAFF_BOARD = 'gameRudecer/SET_ENEMY_DEBAFF_BOARD'

const APPLY_UPGRADE_ON_PERSON = 'gameReducer/APPLY_UPGRADE_ON_PERSON';
const APPLY_POTION_ON_PERSON = 'gameReducer/APPLY_POTION_ON_PERSON';

const SET_AVAILABLE_BALANCE = 'gameReducer/SET_AVAILABLE_BALANCE';
// const TAKE_DAMAGE_ON_ENEMY = 'gameReducer/TAKE_DAMAGE_ON_ENEMY'

const TOGGLE_AVAILABLE_TO_TAKE_DAMAGE = 'gameReducer/TOGGLE_AVAILABLE_TO_TAKE_DAMAGE';

const SET_LEVEL_COMPLETED = 'gameReducer/SET_LEVEL_COMPLETED';
const SET_LEVEL_LOST = 'gameReducer/SET_LEVEL_LOST';

const RESTART_LEVEL = 'gameReducer/RESTART_LEVEL';

// type personsCostToSummonType = {
//   type: DamageType,
//   cost: number[]
// }

const initialState = {
  levelHeader: '',
  // колода соперника . . .
  enemyDeck: [] as RobberType[],
  playerDeck: [] as HeroesType[],
  gameBalance: 0,
  // игровые доски . . .
  playerBoard: Array(16).fill({}),
  playerBoardUpgrades: Array(16).fill([] as SkillUpgradeType[]),
  enemyBoard: Array(16).fill({}),
  enemyBoardDebaff: Array(16).fill([]),
  personCostToSummon: [
    { type: 'magic', cost: [150, 300, 450, 600] },
    { type: 'melee', cost: [100, 200, 300, 400] },
    { type: 'spy', cost: [200, 400, 600, 800] },
    { type: 'support', cost: [120, 200, 250, 300] },
    { type: 'long', cost: [90, 180, 270, 350] },
  ],
  // мы прошли уровень ...
  isLevelCompleted: false,
  // мы не прошли уровень ...
  isLevelLost: false,
};

export type InitialGameStateType = typeof initialState

export const gameReducer = (state = initialState, action: GameActionType): InitialGameStateType => {
  switch (action.type) {
    case SET_LEVEL_HEADER:
      return {
        ...state,
        levelHeader: action.levelHeader,
      };

    case SET_ENEMY_DECK:
      return {
        ...state,
        enemyDeck: [...action.enemyDeck],
      };

    case SET_PLAYER_DECK:
      return {
        ...state,
        playerDeck: [...action.playerDeck],
      };

    case UPDATE_PLAYER_BOARD:
      return {
        ...state,
        playerBoard: action.playerBoard,
        playerBoardUpgrades: action.playerBoardUpgradesCopy,
      };

    case SET_AVAILABLE_BALANCE:
      return {
        ...state,
        gameBalance: action.balance,
      };

    case SET_HERO_ON_BOARD:
      return {
        ...state,
        playerBoard: [...action.playerBoardCopy],
        playerBoardUpgrades: [...action.playerBoardUpgradesCopy],
        playerDeck: [...action.playerDeckCopy],
      };

    case APPLY_UPGRADE_ON_PERSON:
      // решение проблемы, создаем новый объект, вместо того, чтобы просто ссылатся на старый . . .
      const personCopy = { ...state.playerBoard[action.index] };

      if (action.upgrade.type === 'hp' && !personCopy.isHpUpgradeEquipped) {
        personCopy.hp += action.upgrade.count;
        personCopy.currentHp += action.upgrade.count;
        personCopy.isHpUpgradeEquipped = true;
      } else if (action.upgrade.type === 'armor' && !personCopy.isArmorUpgradeEquipped) {
        personCopy.armor += action.upgrade.count;
        personCopy.currentArmor += action.upgrade.count;
        personCopy.isArmorUpgradeEquipped = true;
      } else if (!personCopy.isDamageUpgradeEquipped) {
        personCopy.damage += action.upgrade.count;
        personCopy.isDamageUpgradeEquipped = true;
      }
      return {
        ...state,
        playerBoard: state.playerBoard.map((hero, index) => {
          if (index === action.index) return { ...personCopy };
          return hero;
        }),
      };

    case TOGGLE_AVAILABLE_TO_TAKE_DAMAGE:
      return {
        ...state,
        playerBoard: state.playerBoard.map((hero, index) => {
          if (index === action.heroIndex) {
            return {
              ...hero,
              isAbleToTakeDamage: !hero.isAbleToTakeDamage,
            };
          }
          return hero;
        }),
      };

    case SET_LEVEL_COMPLETED:
      return {
        ...state,
        isLevelCompleted: true,
      };

    case SET_LEVEL_LOST:
      return {
        ...state,
        isLevelLost: true,
      };

    case SET_ENEMY_ON_BOARD:
      const enemyBoardCopy = Array(16).fill({});

      state.enemyDeck.forEach((enemy) => {
        enemyBoardCopy[enemy.boardIndex] = { ...enemy };
      });

      return {
        ...state,
        enemyBoard: [...enemyBoardCopy],
      };

    case RESTART_LEVEL:
      return {
        ...state,
        levelHeader: '',
        // колода соперника . . .
        enemyDeck: [] as RobberType[],
        playerDeck: [] as HeroesType[],
        gameBalance: 0,
        // игровые доски . . .
        playerBoard: Array(16).fill({}),
        playerBoardUpgrades: Array(16).fill([]),
        enemyBoard: Array(16).fill({}),
        personCostToSummon: [
          { type: 'magic', cost: [150, 300, 450, 600] },
          { type: 'melee', cost: [100, 200, 300, 400] },
          { type: 'spy', cost: [200, 400, 600, 800] },
          { type: 'support', cost: [120, 200, 250, 300] },
          { type: 'long', cost: [90, 180, 270, 350] },
        ],
        // мы прошли уровень...
        isLevelCompleted: false,
        // мы не прошли уровень...
        isLevelLost: false,
      };

    case APPLY_POTION_ON_PERSON:
      return {
        ...state,
        playerBoard: state.playerBoard.map((hero, index) => {
          if (index === action.boardIndex) {
            if (hero.currentArmor > 0 && action.potion.type === 'armor') { return { ...hero, currentArmor: summaryOfTwoNumbers(hero.currentArmor, action.potion.count) > hero.armor ? hero.armor : summaryOfTwoNumbers(hero.currentArmor, action.potion.count) }; }

            if (hero.currentArmor === 0 && hero.currentHp > 0 && action.potion.type === 'hp') { return { ...hero, currentHp: summaryOfTwoNumbers(hero.currentHp, action.potion.count) > hero.hp ? hero.hp : summaryOfTwoNumbers(hero.currentHp, action.potion.count) }; }

            if (hero.currentHp > 0 && action.potion.type === 'damage') { return { ...hero, damage: summaryOfTwoNumbers(hero.damage, action.potion.count) }; }
          }
          return hero;
        }),
      };

    /* case SET_SPY_ON_BOARD:
      return {
        ...state,
        enemyDeck: [
          ...state.enemyDeck,
          {
            ...action.hero,
            boardIndex: action.index,
          } as RobberType,
        ],
      };*/

    case SET_ENEMY_DEBAFF_BOARD:
      return {
        ...state,
        enemyBoardDebaff: action.enemyBoardDebaff
      }
      
    default:
      return state;
  }
};

export const gameActions = {
  setLevelHeader: (levelHeader: string) => ({ type: SET_LEVEL_HEADER, levelHeader } as const),
  setEnemyDeck: (enemyDeck: RobberType[]) => ({ type: SET_ENEMY_DECK, enemyDeck } as const),
  setPlayerDeck: (playerDeck: HeroesType[]) => ({ type: SET_PLAYER_DECK, playerDeck } as const),
  updatePlayerBoard: (playerBoard: ({} | HeroesType)[], playerBoardUpgradesCopy: SkillUpgradeType[][]) => ({ type: UPDATE_PLAYER_BOARD, playerBoard, playerBoardUpgradesCopy } as const),
  setHeroOnBoard: (playerBoardCopy: HeroesType[], playerBoardUpgradesCopy: any[], playerDeckCopy: HeroesType[]) => ({
    type: SET_HERO_ON_BOARD, playerBoardCopy, playerBoardUpgradesCopy, playerDeckCopy,
  } as const),
  // setSpyOnBoard: (hero: HeroesType, index: number) => ({ type: SET_SPY_ON_BOARD, hero, index } as const),
  upgradePerson: (upgrade: UpgradeType, index: number) => ({ type: APPLY_UPGRADE_ON_PERSON, upgrade, index } as const),
  setEnemyOnBoard: () => ({ type: SET_ENEMY_ON_BOARD } as const),
  setAvailableBalance: (balance: number) => ({ type: SET_AVAILABLE_BALANCE, balance } as const),
  toggleAvailableToTake: (heroIndex: number) => ({ type: TOGGLE_AVAILABLE_TO_TAKE_DAMAGE, heroIndex } as const),
  setLevelCompleted: () => ({ type: SET_LEVEL_COMPLETED } as const),
  setLevelLost: () => ({ type: SET_LEVEL_LOST } as const),
  restartLevel: () => ({ type: RESTART_LEVEL } as const),
  applyPotionOnEnemy: (potion: ActivePotionType, boardIndex: number) => ({ type: APPLY_POTION_ON_PERSON, potion, boardIndex } as const),
  setEnemyBoardDebaff: (enemyBoardDebaff: SkillUpgradeType[]) => ({type: SET_ENEMY_DEBAFF_BOARD, enemyBoardDebaff} as const)
  // takeDamageOnEnemy: (enemyName: RobbersNamesType, damageCount: number) => ({type: TAKE_DAMAGE_ON_ENEMY, enemyName, damageCount} as const)
};

export const setEnemyDeckThunk = (level: LevelType): GameThunkType => (dispatch, getState) => {
  const robbersList = [...getState().characters.robbersList];
  const statsToUp = [...getState().app.statsToUp];
  const enemyDeckCopy = [] as RobberType[];

  level.bandDeck.forEach((enemy, index) => {
    // достаем объект персонажа из коллекции ...
    const robber = robbersList.filter((robber) => robber.name === enemy.name)[0];
    // создаем новый объект, добовляя необходимые нам свойства ...
    const enemyPerson = {
      ...robber,
      boardIndex: enemy.boardIndex,
      currentHp: 0,
    } as RobberType;

    if (enemy.level > 1) {
      enemyPerson.level = enemy.level;

      const statsToUpCopy = statsToUp.filter((stats) => stats.type === enemyPerson.type)[0].improve;

      // увеличивать характеристики персонажа под его уровень . . .
      for (let i = 0; i < enemy.level - 1; i++) {
        enemyPerson.hp += statsToUpCopy[i].hp;
        enemyPerson.damage += statsToUpCopy[i].damage;
        enemyPerson.armor += statsToUpCopy[i].armor;
      }
    }
    // счетчик жизни, который по ходу игру будет отниматся ...
    enemyPerson.hp = Number(enemyPerson.hp.toFixed(2));
    enemyPerson.armor = Number(enemyPerson.armor.toFixed(2));

    enemyPerson.currentHp = enemyPerson.hp;
    enemyPerson.currentArmor = enemyPerson.armor;
    // @ts-ignore
    enemyDeckCopy.push(enemyPerson);
  });

  dispatch(gameActions.setLevelHeader(level.bandTitle));
  dispatch(gameActions.setEnemyDeck(enemyDeckCopy));
  dispatch(gameActions.setAvailableBalance(level.availableBalance));
};
export const setPlayerDeckThunk = (): GameThunkType => (dispatch, getState) => {
  const playerDeckCopy = [...getState().profile.deck.cards] as HeroesType[];

  playerDeckCopy.forEach((player, index) => {
    playerDeckCopy[index].currentHp = player.hp;
    playerDeckCopy[index].currentArmor = player.armor;
    playerDeckCopy[index].quantityOnBoard = 0;

    playerDeckCopy[index].isDamageUpgradeEquipped = false;
    playerDeckCopy[index].isArmorUpgradeEquipped = false;
    playerDeckCopy[index].isHpUpgradeEquipped = false;

    playerDeckCopy[index].isAbleToTakeDamage = false;
  });

  dispatch(gameActions.setPlayerDeck(playerDeckCopy));
};
export const setHeroOnBoardThunk = (hero: HeroesType, index: number): GameThunkType => (dispatch, getState) => {
  const playerBoardCopy = [...getState().gamePage.playerBoard];
  const playerBoardUpgradesCopy = [...getState().gamePage.playerBoardUpgrades];
  const playerDeckCopy = [...getState().gamePage.playerDeck];

  playerDeckCopy.forEach((player, index) => {
    if (player.name === hero.name) {
      playerDeckCopy[index].quantityOnBoard += 1;
    }
  });

  playerBoardCopy[index] = {
    ...hero,
    isAbleToTakeDamage: true,
    boardIndex: index,
  };

  if (hero.type === 'support') {
    // @ts-ignore TODO сделать реализацию акитвных и пассивных способностей...
    if (hero.skill?.condition === 'passive') {
      calculateAvailableCells(index, hero.skill.cells).forEach((cell) => {
        playerBoardUpgradesCopy[cell] = [
          ...playerBoardUpgradesCopy[cell],
          {
            type: hero.skill?.type,
            about: hero.skill?.about,
            img: hero.skill?.img,
            count: hero.skill?.count,
            condition: hero.skill?.condition,
            owner: index,
          },
        ] as SkillUpgradeType[];
      });
    } else if (hero.skill?.condition === 'active') {
      calculateAvailableCells(index, hero.skill.cells).forEach((cell, cellIndex) => {
        // TODO в будущем перенести это в thunk для более оптимизированной работы...
        if (playerBoardCopy[cell].name) {
          if (hero.skill?.type === 'recovery') {
            playerBoardCopy[cell] = {
              ...playerBoardCopy[cell],
              currentArmor: playerBoardCopy[cell].currentArmor > 0
                ? summaryOfTwoNumbers(playerBoardCopy[cell].currentArmor, playerBoardCopy[cell].currentArmor * hero.skill.count) > playerBoardCopy[cell].armor
                  ? playerBoardCopy[cell].armor : summaryOfTwoNumbers(playerBoardCopy[cell].currentArmor, playerBoardCopy[cell].currentArmor * hero.skill.count) : 0,
              currentHp: playerBoardCopy[cell].currentHp > 0
                ? summaryOfTwoNumbers(playerBoardCopy[cell].currentHp, playerBoardCopy[cell].currentHp * hero.skill.count) > playerBoardCopy[cell].hp
                  ? playerBoardCopy[cell].hp : summaryOfTwoNumbers(playerBoardCopy[cell].currentHp, playerBoardCopy[cell].currentHp * hero.skill.count) : 0,
            };
          }
        }
      });
    }
  }

  dispatch(gameActions.setHeroOnBoard(playerBoardCopy, playerBoardUpgradesCopy, playerDeckCopy));
};
export const takeDamageToEnemyThunk = (enemyIndex: number, damageType: DamageType, damageCount: number, heroIndex: number): GameThunkType => (dispatch, getState) => {
  const enemyDeckCopy = [...getState().gamePage.enemyDeck];
  const enemyBoardDebaffCopy = [ ...getState().gamePage.enemyBoardDebaff ] 
  const enemyCopy = { ...getState().gamePage.enemyBoard[enemyIndex] }
  const playerBoardUpgradesCopy = [...getState().gamePage.playerBoardUpgrades]
  const hero = {...getState().gamePage.playerBoard[heroIndex]}
  // console.log(hero)
  // просто считаем коэф урона...
  const damageMultiplier = multiplicationOfTwoNumber(
    debaffDamageCalculation(enemyBoardDebaffCopy, enemyIndex),
    multiplicationOfTwoNumber(
    supportDamageCalculation(playerBoardUpgradesCopy, heroIndex),
    multiplicationOfTwoNumber(classDamageCalculation(damageType, enemyCopy.type), isArmorOrHpDamageCalculation(enemyCopy.currentArmor)),
  ));
  
  // console.log(`debaff: ${debaffDamageCalculation(enemyBoardDebaffCopy, enemyIndex)}`)
  // console.log(`support: ${supportDamageCalculation(playerBoardUpgradesCopy, heroIndex)}`);
  // console.log(`class + armor: ${multiplicationOfTwoNumber(classDamageCalculation(damageType, enemyCopy.type), isArmorOrHpDamageCalculation(enemyCopy.currentArmor))}`);
  // console.log(`total: ${damageMultiplier}`);
  
  if (hero.type === 'magic') {
    
    [heroIndex, ...calculateAvailableCells(heroIndex, [1, -1, 4, -4])].forEach(cell => {
      console.log(cell)
      enemyDeckCopy.forEach((enemy, index) => {
        if (enemy.boardIndex === cell) {
          // @ts-ignore
          enemyDeckCopy[index] = takeEnemyDamage(enemyDeckCopy[index], damageMultiplier * damageCount)
        }
      })
    })
  } else {
    enemyDeckCopy.forEach((enemy, index) => {
    if (enemy.boardIndex === enemyIndex) {
      // @ts-ignore / наносим урон противнику по броне или по здоровью...
      enemyDeckCopy[index] = takeEnemyDamage(enemy, damageMultiplier * damageCount);
      }
    });
  }

  
  // if (enemyCopy.currentHp <= 0) {}
  // сделать флаг для проверки жив персонаж или нет

  const totalAliveEnemies = enemyDeckCopy.reduce((total, enemy) => {
    if (enemy.currentHp > 0) total += 1;
    return total;
  }, 0);

  if (totalAliveEnemies === 0) {
    dispatch(gameActions.setLevelCompleted());
    // @ts-ignore
    dispatch(appAction.setIsLevelStarted(false));

    console.log('победа');
  }

  dispatch(gameActions.setEnemyDeck(enemyDeckCopy));
  dispatch(gameActions.setEnemyOnBoard());
};
export const takeDamageToHeroThunk = () : GameThunkType => (dispatch, getState) => {
  const playerBoardCopy = [...getState().gamePage.playerBoard];
  const enemyBoardCopy = [...getState().gamePage.enemyBoard];
  let playerBoardUpgradesCopy = [...getState().gamePage.playerBoardUpgrades];
  // массив со всеми живыми персонажами...
  const players = playerBoardCopy.filter((hero) => hero.currentHp > 0);
  // массив живых разбойников...
  const enemies = enemyBoardCopy.filter((enemy) => enemy.currentHp > 0);
  // количество героев, которые еще могут сделать атаку...
  const totalTurns = players.reduce((total, hero) => {
    if (hero.isAbleToTakeDamage) total += 1;
    return total;
  }, 0);

  if (totalTurns === 0) {
    /*
    проходим по массиву противников...
      1) из последний версии доски игрока выбираются возможные цели
      2) проходим по всем целям и выбираем наиболее опасную
      3) наносим урон по цели
      4) обновляем состояние доски
    после прохождения по всем разбойникам диспатчим обновленную доску игрока в state...
    */
    enemies.forEach((enemy, enemyIndex) => {
      // массив с героями, которых может атаковать бот...
      const availableHeroes = calculateAvailableHeroes('enemy', playerBoardCopy) as HeroesType[];

      // наши веса для определнию наилучшей цели для атаки...
      const totalWeights = Array(availableHeroes.length).fill({ amount: 0, index: 0, damage: 0 });

      // проверка есть ли еще цели для атаки...
      if (availableHeroes.length > 0) {
        availableHeroes.forEach((hero, heroIndex) => {
          // возможный полученный урон...
          const takenDamage = multiplicationOfTwoNumber(
          // коэф урона от саппорта...
            supportDamageCalculation(playerBoardUpgradesCopy, hero.boardIndex),
            multiplicationOfTwoNumber(
            // урон героя...
              hero.damage,
              // коэф урона броня + класс
              multiplicationOfTwoNumber(classDamageCalculation(hero.type, enemy.type), isArmorOrHpDamageCalculation(enemy.currentArmor)),
            ),
          );
          // возможный нанесенный урон...
          const doneDamage = multiplicationOfTwoNumber(
            supportProtectionCalculation(playerBoardUpgradesCopy, hero.boardIndex),
            multiplicationOfTwoNumber(
              enemy.damage,
              multiplicationOfTwoNumber(classDamageCalculation(enemy.type, hero.type), isArmorOrHpDamageCalculation(hero.currentArmor)),
            ),
          );

          // записываем вес, индекс и урон в массив весов...
          totalWeights[heroIndex] = { index: hero.boardIndex, amount: multiplicationOfTwoNumber(takenDamage, doneDamage), damage: doneDamage };
        });
        // выбираем
        const candidate = {
          index: totalWeights.sort((prev, next) => next.amount - prev.amount)[0].index,
          damage: totalWeights.sort((prev, next) => next.amount - prev.amount)[0].damage,
        };
        // обновляем на доске состояние хп игрока...
        playerBoardCopy[candidate.index] = takeEnemyDamage(playerBoardCopy[candidate.index], candidate.damage);
        console.log(totalWeights);
        // console.log({...playerBoardCopy[candidate.index]})
        // console.log([...availableHeroes])
      } else {
        // TODO сюда можно засунуть функцию с реализацией пройгрыша игры...
        dispatch(gameActions.setLevelLost());
        // @ts-ignore
        dispatch(appAction.setIsLevelStarted(false));
        console.log('поражение');
      }
    });
    players.forEach((hero, heroIndex) => {
      playerBoardCopy[hero.boardIndex] = {
        ...playerBoardCopy[hero.boardIndex],
        isAbleToTakeDamage: true,
      };
    });

    playerBoardUpgradesCopy = checkPlayerUpgradesBoard(playerBoardCopy, playerBoardUpgradesCopy);
    dispatch(gameActions.updatePlayerBoard(playerBoardCopy, playerBoardUpgradesCopy));
  }

  // let weights = Array(playerBoardCopy.filter(hero => hero.currentHp > 0).length).fill(0)
  // console.log(weights)
};
export const setSpyOnBoardThunk = (hero: HeroesType, index: number): GameThunkType => (dispatch, getState) => {
  let enemyDeckCopy = [ ...getState().gamePage.enemyDeck ]
  let enemyBoardDebaffCopy = [ ...getState().gamePage.enemyBoardDebaff ]

  enemyDeckCopy = [
    ...enemyDeckCopy,
    {
      ...hero,
      boardIndex: index
    } as RobberType
  ]
  // @ts-ignore
  if (hero.skill?.condition === 'passive') {
  calculateAvailableCells(index, hero.skill?.cells).forEach((cell) => {
    enemyBoardDebaffCopy[cell] = [
      ...enemyBoardDebaffCopy[cell],
      {
        about: hero.skill?.about,
        type: hero.skill?.type,
        img: hero.skill?.img,
        count: hero.skill?.count, 
        owner: index
      }
    ]
  })
  } else {
    // @ts-ignore
    calculateAvailableCells(index, hero.skill?.cells).forEach((cell) => {
      // @ts-ignore
      if (hero.skill?.type === 'hp') {
        enemyDeckCopy = enemyDeckCopy.map((enemy) => {
          if(enemy.boardIndex === cell) 
          return takeEnemyDamage(enemy, enemy.currentArmor > 0 
            // @ts-ignore
            ? enemy.armor * hero.skill?.count : enemy.hp * hero.skill?.count)
          return enemy
        }) as RobberType[]
      }
    })
  }
  
  dispatch(gameActions.setEnemyDeck(enemyDeckCopy))
  dispatch(gameActions.setEnemyBoardDebaff(enemyBoardDebaffCopy))

};

export type RobberType = CharacterType & {
  boardIndex: number,
  currentHp: number,
  currentArmor: number,
  name: RobbersNamesType
}

export type HeroesType = CharacterType & {
  boardIndex: number
  currentHp: number,
  currentArmor: number,
  quantityOnBoard: 0 | 1 | 2 | 3 | 4,
  isAbleToTakeDamage: boolean
  isHpUpgradeEquipped: boolean,
  isArmorUpgradeEquipped: boolean,
  isDamageUpgradeEquipped: boolean
}
type GameActionType = InferActionType<typeof gameActions>
type GameThunkType = ThunkAction<any, AppStateType, unknown, GameActionType>

export type SkillUpgradeType = {
  about: string
  type: skillType
  count: number
  condition: 'passive' | 'active'
  owner: number
  img: string
}
