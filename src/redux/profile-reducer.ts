import { charactersRarity, CharacterType, DamageType, skillType } from './characters-reducer';
import { AppStateType, InferActionType } from './store';
import { ThunkAction } from 'redux-thunk';
import { ChestsCostType, LootObjectType } from './shop-reducer';
import { ActivePotionType, PotionType } from './app-reducer';
import hp1 from '../img/potions/hp_1.png';
import hp2 from '../img/potions/hp_2.png';
import hp3 from '../img/potions/hp_3.png';
import armor3 from '../img/potions/armor_3.png';
import damage1 from '../img/potions/damage_1.png';
import damage2 from '../img/potions/damage_2.png';
import damage3 from '../img/potions/damage_3.png';
import { summaryOfTwoNumbers } from '../utils/mathsExpressions';

import png1 from './../img/characters/background/1.png';
import png2 from './../img/characters/background/2.png';
import png3 from './../img/characters/background/3.png';
import png4 from './../img/characters/background/4.png';
import png5 from './../img/characters/background/5.png';
import png6 from './../img/characters/background/6.png';
import png7 from './../img/characters/background/7.png';
import png8 from './../img/characters/background/8.png';
import png9 from './../img/characters/background/9.png';
import png10 from './../img/characters/background/10.png';
import png11 from './../img/characters/background/11.png';
import png12 from './../img/characters/background/12.png';
import png13 from './../img/characters/background/13.png';
import png14 from './../img/characters/background/14.png';
import png15 from './../img/characters/background/15.png';

import skill1 from './../img/skills/Icon33.png';
import skill2 from './../img/skills/Icon36.png';
import skill3 from './../img/skills/Icon24.png';
import skill4 from './../img/skills/Icon20.png';
import skill5 from './../img/skills/Icon9.png';

const FILTER_CARDS = 'profile/FILTER_CARDS';
const ADD_CARD_TO_DECK = 'profile/ADD_CARD_TO_DECK';
const ADD_CARD_TO_PROFILE = 'profile/ADD_CARD_TO_PROFILE';
const ADD_CURRENCY_TO_PROFILE = 'profile/ADD_CURRENCY_TO_PROFILE';
const CARD_LEVEL_UP = 'profile/CARD_LEVEL_UP';

const ADD_POTION_TO_ACTIVE_INVENTORY = 'profile/ADD_POTION_TO_ACTIVE_INVENTORY';
const REMOVE_POTION_FROM_ACTIVE_INVENTORY = 'profile/REMOVE_POTION_FROM_ACTIVE_INVENTORY';

let initialState = {
	gem: 0,
	silver: 0,
	gold: 0,
	level: 1,
	// инвентарь игрока...
	inventory: {
		cards: [
			{
				name: 'Esther',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'support' as DamageType,
				img: png1,
				skill: {
					about: '+15% урона у юнитов в соседних клетках',
					type: 'damage' as skillType,
					img: skill1,
					cells: [1, -1, 4, -4],
					count: 0.15,
					condition: 'passive',
				},
				damage: 1,
				hp: 3,
				armor: 4,
				level: 1,
				count: 100,
				about:
					'Дочь народа полей. ' +
					'Всегда готова помочь своим друзьям.' +
					'Не смотря на ее юность и красоту, из нее вышел бы хороший помощник на поле боя',
			},
			{
				name: 'Knud',
				rarity: 'rare' as charactersRarity,
				rarityPriority: 2,
				type: 'melee' as DamageType,
				img: png2,
				damage: 3,
				hp: 5,
				armor: 6,
				level: 1,
				count: 100,
				about:
					'Он с детсва мечтал быть рыцарем, ' +
					'но вместо меча в руках держит лишь вилы. ' +
					'Может быть настанет день когда всё изменится... ',
			},
			{
				name: 'Agneta',
				rarity: 'epic' as charactersRarity,
				rarityPriority: 3,
				type: 'magic' as DamageType,
				img: png3,
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Молодая девушка из дома Рагнара. С детсва изучает магию и проводит эксперименты над крысами.',
			},
			{
				name: 'Bernt',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'melee' as DamageType,
				img: png4,
				damage: 3,
				hp: 4,
				armor: 5,
				level: 1,
				count: 100,
				about: 'Рабочий клана полей. Питает слабость к азартным играм и хмельным напиткам.',
			},
			{
				name: 'Claudia',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'support' as DamageType,
				img: png5,
				skill: {
					about: '+20% к поглащеню урона у юнитов в соседних клетках',
					type: 'protection' as skillType,
					img: skill2,
					cells: [1, -1, 4, -4],
					count: 0.2,
					condition: 'passive',
				},
				damage: 2,
				hp: 5,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Служанка дома Рагнара. Мечтает о своем хозяйстве и муже с приданным.',
			},
			{
				name: 'Charlotte',
				rarity: 'rare' as charactersRarity,
				rarityPriority: 2,
				type: 'magic' as DamageType,
				img: png6,
				damage: 5,
				hp: 6,
				armor: 3,
				level: 1,
				count: 100,
				about: 'Загадочная путница из клана ведьм. Способна убить одним взглядом. Всегда берет что хочет. Корона назначала за нее награду... ',
			},
			{
				name: 'Oluf',
				rarity: 'rare' as charactersRarity,
				rarityPriority: 2,
				type: 'melee' as DamageType,
				img: png7,
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Младший сын Рагнара. С детсва обучается владению оружием. Внешне выглядит безобидно, но это не так.',
			},
			{
				name: 'Sigvard',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'long' as DamageType,
				img: png8,
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Бывший мушкетер королевской стражи. Уже много лет живет вдали ото всех. Местные считают, что это дряхлый старик, но в стрельбе ему нет равных...',
			},
			{
				name: 'Tessan',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'melee' as DamageType,
				img: png9,
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Местный трактирщик. Знает все местные кланы и последние новости. Днем он продает баранину и хмель, а ночью тренируется с мечом на задем дворе...',
			},
			{
				name: 'Tilda',
				rarity: 'rare' as charactersRarity,
				rarityPriority: 2,
				type: 'long' as DamageType,
				img: png10,
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Член королевской семьи. Обожает пиры а прогулки на лошодях, но мало кто знает, что самым сильным её увлеченем это стрельба из арбалета...',
			},
			{
				name: 'Victor',
				rarity: 'epic' as charactersRarity,
				rarityPriority: 3,
				type: 'spy' as DamageType,
				img: png11,
				skill: {
					about: 'Моментально снимает 25% от брони или здоровья в соседних клетках при появлении на поле',
					type: 'hp',
					img: skill4,
					cells: [1, -1, 4, -4],
					count: 0.25,
					condition: 'active',
				},
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Королевский посол. Знает о всем, что происходит на западном побережье от дома Рагнара до ведьменных болот.',
			},
			{
				name: 'Victoria',
				rarity: 'epic' as charactersRarity,
				rarityPriority: 3,
				type: 'support' as DamageType,
				img: png12,
				skill: {
					about: '25% восстановления брони или здоровья в соседних клетках при появлении на поле',
					type: 'recovery' as skillType,
					img: skill3,
					cells: [1, -1, 4, -4],
					count: 0.25,
					condition: 'active',
				},
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Одна из дочерей Рагнара. О ней мало что известно, ведь на людях она появляется крайне редко. Может кто и знает, чем она там занимается?',
			},
			{
				name: 'Varg',
				rarity: 'epic' as charactersRarity,
				rarityPriority: 3,
				type: 'spy' as DamageType,
				img: png13,
				skill: {
					about: '+20% к получаемому урону в соседних клетках пока находится на столе',
					type: 'protection',
					img: skill5,
					cells: [1, -1, 4, -4],
					count: 0.2,
					condition: 'passive',
				},
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Один из проффесоров академии "золотых времен". Знает всю темную историю королевства, правда кто поверит дряхлому старику?',
			},
			{
				name: 'Ursula',
				rarity: 'rare' as charactersRarity,
				rarityPriority: 2,
				type: 'magic' as DamageType,
				img: png14,
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Ученица королевской академии. Ставит научные эксперименты, а тажке увлекается легкой магией. Ходят слухи, что у неё роман с сыном короля...',
			},
			{
				name: 'Frans',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'long' as DamageType,
				img: png15,
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Охотник из клана полей. В стрельбе из лука ему нет равных. Ходят слухи, что сам предводитель клана Аксель, ходит с ним на охоту...',
			},
		] as CharacterType[],
		potions: [
			{
				type: 'hp' as 'damage' | 'hp' | 'armor',
				level: 1,
				about: 'Лёгкое зелье, добавляет к здоровью 1 ед',
				img: hp1,
				count: 1,
				amount: 2,
			},
			{
				type: 'hp' as 'damage' | 'hp' | 'armor',
				level: 2,
				about: 'Среднее зелье, добавляет к здоровью 2 ед',
				img: hp2,
				count: 2,
				amount: 2,
			},
			{
				type: 'hp' as 'damage' | 'hp' | 'armor',
				level: 3,
				about: 'Тяжелое зелье, добавляет к здоровью 3 ед',
				img: hp3,
				count: 3,
				amount: 2,
			},
			{
				type: 'armor' as 'damage' | 'hp' | 'armor',
				level: 3,
				about: 'Тяжелое зелье, добавляет к броне 3 ед',
				img: armor3,
				count: 3,
				amount: 2,
			},
			{
				type: 'damage' as 'damage' | 'hp' | 'armor',
				level: 1,
				about: 'Лёгкое зелье, добавляет к урону 0.2 ед',
				img: damage1,
				count: 0.2,
				amount: 2,
			},
			{
				type: 'damage' as 'damage' | 'hp' | 'armor',
				level: 2,
				about: 'Среднее зелье, добавляет к урону 0.4 ед',
				img: damage2,
				count: 0.4,
				amount: 2,
			},
			{
				type: 'damage' as 'damage' | 'hp' | 'armor',
				level: 3,
				about: 'Тяжелое зелье, добавляет к урону 0.6 ед',
				img: damage3,
				count: 0.6,
				amount: 2,
			},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		] as PotionType[],
		items: [],
	},
	deck: {
		cards: [
			{
				name: 'Esther',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'support' as DamageType,
				img: png1,
				skill: {
					about: '+15% урона у юнитов в соседних клетках',
					type: 'damage' as skillType,
					img: skill1,
					cells: [1, -1, 4, -4],
					count: 0.15,
					condition: 'passive',
				},
				damage: 1,
				hp: 3,
				armor: 4,
				level: 1,
				count: 100,
				about:
					'Дочь народа полей. ' +
					'Всегда готова помочь своим друзьям.' +
					'Не смотря на ее юность и красоту, из нее вышел бы хороший помощник на поле боя',
			},
			{
				name: 'Knud',
				rarity: 'rare' as charactersRarity,
				rarityPriority: 2,
				type: 'melee' as DamageType,
				img: png2,
				damage: 3,
				hp: 5,
				armor: 6,
				level: 1,
				count: 100,
				about:
					'Он с детсва мечтал быть рыцарем, ' +
					'но вместо меча в руках держит лишь вилы. ' +
					'Может быть настанет день когда всё изменится... ',
			},
			{
				name: 'Agneta',
				rarity: 'epic' as charactersRarity,
				rarityPriority: 3,
				type: 'magic' as DamageType,
				img: png3,
				damage: 7,
				hp: 4,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Молодая девушка из дома Рагнара. С детсва изучает магию и проводит эксперименты над крысами.',
			},
			{
				name: 'Bernt',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'melee' as DamageType,
				img: png4,
				damage: 3,
				hp: 4,
				armor: 5,
				level: 1,
				count: 100,
				about: 'Рабочий клана полей. Питает слабость к азартным играм и хмельным напиткам.',
			},
			{
				name: 'Claudia',
				rarity: 'common' as charactersRarity,
				rarityPriority: 1,
				type: 'support' as DamageType,
				img: png5,
				skill: {
					about: '+20% к поглащеню урона у юнитов в соседних клетках',
					type: 'protection' as skillType,
					img: skill2,
					cells: [1, -1, 4, -4],
					count: 0.2,
					condition: 'passive',
				},
				damage: 2,
				hp: 5,
				armor: 2,
				level: 1,
				count: 100,
				about: 'Служанка дома Рагнара. Мечтает о своем хозяйстве и муже с приданным.',
			},
		] as CharacterType[],
		potions: Array(10).fill({}) as ActivePotionType[],
	},
	filteredCards: [] as CharacterType[],
};

export type InitialProfileStateType = typeof initialState;

export const profileReducer = (
	state = initialState,
	action: ProfileActionType,
): InitialProfileStateType => {
	switch (action.type) {
		case FILTER_CARDS:
			let filteredCardsCopy = [] as CharacterType[];

			switch (action.filter) {
				case 'rarity':
					filteredCardsCopy = state.inventory.cards.sort(
						(prev, next) => prev.rarityPriority - next.rarityPriority,
					);
					break;
				case 'level':
					filteredCardsCopy = state.inventory.cards.sort(
						(prev, next) => prev.level - next.level,
					);
					break;
				case 'type':
					filteredCardsCopy = state.inventory.cards.sort((prev, next) => {
						if (
							prev.type === 'melee' &&
							(next.type === 'long' ||
								next.type === 'magic' ||
								next.type === 'support' ||
								next.type === 'spy')
						)
							return -1;
						if (
							prev.type === 'long' &&
							(next.type === 'magic' || next.type === 'support' || 'spy')
						)
							return -1;
						if (prev.type === 'magic' && (next.type === 'support' || next.type === 'spy'))
							return -1;
						if (prev.type === 'support' && next.type === 'spy') return -1;

						return 0;
					});
					break;
				default:
					break;
			}

			return {
				...state,
				filteredCards: [...filteredCardsCopy],
			};

		case ADD_CARD_TO_DECK:
			return {
				...state,
				deck: {
					...state.deck,
					cards: state.deck.cards.map((card, index) => {
						if (index === action.index) {
							return action.card;
						}
						return card;
					}),
				},
			};

		case ADD_CURRENCY_TO_PROFILE:
			return {
				...state,
				[action.currency]: state[action.currency] + action.count,
			};

		case ADD_CARD_TO_PROFILE:
			let cardsCopy = [...state.inventory.cards];

			// debugger

			if (cardsCopy.some((card) => card.name === action.card.name)) {
				cardsCopy.forEach((card, index) => {
					if (card.name === action.card.name) {
						cardsCopy[index].count += action.count;
					}
				});
			} else {
				cardsCopy = [...cardsCopy, action.card];
			}

			return {
				...state,
				inventory: {
					...state.inventory,
					cards: [...cardsCopy],
				},
			};

		case CARD_LEVEL_UP:
			let cardsToUpCopy = [...state.inventory.cards];
			cardsToUpCopy.forEach((card, index) => {
				if (card.name === action.card.name) {
					// TODO надо понять как сделать так, чтобы реакт понимал что надо обновить состояние...
					cardsToUpCopy[index].count = action.card.count;
					cardsToUpCopy[index].level = action.card.level;
					cardsToUpCopy[index].hp = action.card.hp;
					cardsToUpCopy[index].armor = action.card.armor;
					cardsToUpCopy[index].damage = action.card.damage;
				}
			});

			return {
				...state,
				inventory: {
					...state.inventory,
					cards: cardsToUpCopy,
				},
			};

		case ADD_POTION_TO_ACTIVE_INVENTORY:
			return {
				...state,
				deck: {
					...state.deck,
					potions: action.activePotions,
				},
				inventory: {
					...state.inventory,
					potions: action.inventoryPotions,
				},
			};
		case REMOVE_POTION_FROM_ACTIVE_INVENTORY:
			return {
				...state,
				deck: {
					...state.deck,
					potions: state.deck.potions.map((potion, index) => {
						if (index === action.inventoryIndex) return {} as ActivePotionType;
						return potion;
					}),
				},
			};
		default:
			return state;
	}
};

export const profileActions = {
	filterCards: (filter: FilterType) => ({ type: FILTER_CARDS, filter } as const),
	addCardToDeck: (index: number, card: CharacterType) =>
		({ type: ADD_CARD_TO_DECK, index, card } as const),
	addCurrencyToProfile: (currency: ChestsCostType, count: number) =>
		({ type: ADD_CURRENCY_TO_PROFILE, currency, count } as const),
	addCardToProfile: (card: CharacterType, count: number) =>
		({ type: ADD_CARD_TO_PROFILE, card, count } as const),
	cardLevelUp: (card: CharacterType) => ({ type: CARD_LEVEL_UP, card } as const),
	addPotionToActiveInventory: (
		activePotions: ActivePotionType[],
		inventoryPotions: PotionType[],
	) => ({ type: ADD_POTION_TO_ACTIVE_INVENTORY, activePotions, inventoryPotions } as const),
	removePotionFromActiveInventory: (inventoryIndex: number) =>
		({ type: REMOVE_POTION_FROM_ACTIVE_INVENTORY, inventoryIndex } as const),
};

export const addLootToProfileThunk =
	(lootObj: LootObjectType): ProfileThunkType =>
	(dispatch, getState) => {
		lootObj.type === 'silver' || lootObj.type === 'gold' || lootObj.type === 'gem'
			? dispatch(profileActions.addCurrencyToProfile(lootObj.type, lootObj.count))
			: dispatch(profileActions.addCardToProfile(lootObj.person, lootObj.count));
	};

export const cardLevelUpThunk =
	(cardName: string, cardsCount: number): ProfileThunkType =>
	(dispatch, getState) => {
		let cardsToUpCopy = [...getState().profile.inventory.cards];
		let statsToUpCopy = [...getState().app.statsToUp];

		let cardCopy = { ...cardsToUpCopy.filter((card) => card.name === cardName)[0] };
		let stats = { ...statsToUpCopy.filter((s) => s.type === cardCopy.type)[0] };
		// работает исправно!
		cardCopy.count -= cardsCount;

		cardCopy.damage = summaryOfTwoNumbers(
			cardCopy.damage,
			stats.improve[cardCopy.level - 1].damage,
		);
		cardCopy.hp = summaryOfTwoNumbers(cardCopy.hp, stats.improve[cardCopy.level - 1].hp);
		cardCopy.armor = summaryOfTwoNumbers(cardCopy.armor, stats.improve[cardCopy.level - 1].armor);

		cardCopy.level += 1;

		dispatch(profileActions.cardLevelUp(cardCopy));
	};

export const addPotionToActiveInventoryThunk =
	(potion: PotionType, index: number): ProfileThunkType =>
	(dispatch, getState) => {
		let activePotionsCopy = [...getState().profile.deck.potions];
		let inventoryPotionsCopy = [...getState().profile.inventory.potions];

		// если в ячейке уже есть зелье, то мы меняем старое на новое, но копируем старое...
		if (!!activePotionsCopy[index].about) {
			// копия старого зелья
			let potionCopy = { ...activePotionsCopy[index] };
			inventoryPotionsCopy = inventoryPotionsCopy.map((invPotion, invIndex) => {
				if (invPotion.about === potionCopy.about)
					return { ...invPotion, amount: invPotion.amount + 1 };
				return invPotion;
			});
			// ставим новое зелье
		}

		activePotionsCopy[index] = { ...potion };

		inventoryPotionsCopy = inventoryPotionsCopy.map((invPotion, invIndex) => {
			if (invPotion.about === potion.about)
				return { ...invPotion, amount: invPotion.amount - 1 };
			return invPotion;
		});

		dispatch(profileActions.addPotionToActiveInventory(activePotionsCopy, inventoryPotionsCopy));
	};

type ProfileActionType = InferActionType<typeof profileActions>;
type ProfileThunkType = ThunkAction<any, AppStateType, unknown, ProfileActionType>;
export type FilterType = 'rarity' | 'level' | 'type';
