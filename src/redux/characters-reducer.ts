// import characters avatars. . .
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

import robber1 from './../img/characters/background/28.png';
import robber2 from './../img/characters/background/30.png';
import robber3 from './../img/characters/background/32.png';
import robber4 from './../img/characters/background/44.png';

import skill1 from './../img/skills/Icon33.png';
import skill2 from './../img/skills/Icon36.png';
import skill3 from './../img/skills/Icon24.png';
import skill4 from './../img/skills/Icon20.png';
import skill5 from './../img/skills/Icon9.png';

import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionType } from './store';

const FILTER_CARDS = 'characters/FILTER_CARDS';

// у нас есть несколько видов юнитов . . .
// "melee"    [ хорошая броня / среднее здоровье / маленький урон ]
// "support"  [ слабая броня  / среднее здоровье / маленький урон ] ( должен как-то помогать команде )
// "long"     [ средняя броня / слабое здоровье  / средний урон ]
// "magic"    [ слабая броня  / слабое здоровье  / высокий урон ]
// "spy"      [ средняя броня / среднее здоровье / средний урон ]
// ( ставится на стол противника, увеличивая его стату, но дает возможность ...взять две карты бесплатно или еще чего )

// ====================================

// разбойники ...

// при улучшении карт, все карты кроме типа spy будут повышать свой хар-ки, в то время как шпион, будет понижать свою стату ...

let initialState = {
	charactersList: [
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
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
			count: 0,
			about: 'Охотник из клана полей. В стрельбе из лука ему нет равных. Ходят слухи, что сам предводитель клана Аксель, ходит с ним на охоту...',
		},
	] as CharacterType[],
	robbersList: [
		{
			name: 'Rasmus' as RobbersNamesType,
			rarity: 'common' as charactersRarity,
			rarityPriority: 1,
			type: 'long' as DamageType,
			img: robber1,
			damage: 2,
			hp: 2,
			armor: 2,
			level: 1,
			count: 0,
			about: '',
		},
		{
			name: 'Ruben' as RobbersNamesType,
			rarity: 'common' as charactersRarity,
			rarityPriority: 1,
			type: 'melee' as DamageType,
			img: robber2,
			damage: 1,
			hp: 2,
			armor: 3,
			level: 1,
			count: 0,
			about: '',
		},
		{
			name: 'Ulf' as RobbersNamesType,
			rarity: 'rare' as charactersRarity,
			rarityPriority: 1,
			type: 'melee' as DamageType,
			img: robber3,
			damage: 1,
			hp: 4,
			armor: 3,
			level: 1,
			count: 0,
			about: '',
		},
		{
			name: 'Folke' as RobbersNamesType,
			rarity: 'epic' as charactersRarity,
			rarityPriority: 1,
			type: 'melee' as DamageType,
			img: robber4,
			damage: 3,
			hp: 4,
			armor: 3,
			level: 1,
			count: 0,
			about: '',
		},
	],
	filteredCards: [
		// filteredCards here...
	] as CharacterType[],
};

export type InitialCharactersStateType = typeof initialState;

export const charactersReducer = (
	state = initialState,
	action: CharacterActionType,
): InitialCharactersStateType => {
	switch (action.type) {
		case FILTER_CARDS:
			return {
				...state,
				filteredCards: action.filterCards,
			};

		default:
			return state;
	}
};

export const charactersActions = {
	filteredCards: (filterCards: CharacterType[]) => ({ type: FILTER_CARDS, filterCards } as const),
};

export const filterCardsThunk = (): CharactersThunkType => (dispatch, getState) => {
	let profileCharactersCopy = [...getState().profile.inventory.cards] as CharacterType[];
	let charactersCopy = [...getState().characters.charactersList] as CharacterType[];
	let filteredCharacters = [] as CharacterType[];

	const isCardExist = (card: CharacterType) => {
		return !profileCharactersCopy.some((p) => p.name === card.name);
	};

	filteredCharacters = charactersCopy
		.filter(isCardExist)
		.sort((prev, next) => prev.rarityPriority - next.rarityPriority);

	dispatch(charactersActions.filteredCards(filteredCharacters));
};

// создаем тип для ActionCreator
type CharacterActionType = InferActionType<typeof charactersActions>;
// создаем тип для Thunk
type CharactersThunkType = ThunkAction<any, AppStateType, unknown, CharacterActionType>;

export type DamageType = 'melee' | 'support' | 'long' | 'magic' | 'spy';
export type charactersRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type skillType = 'damage' | 'protection' | 'support' | 'recovery';
export type CharacterType = {
	name: string;
	rarity: charactersRarity;
	rarityPriority: number;
	type: DamageType;
	img: string;
	skill?: {
		about: string;
		type: skillType;
		img: string;
		cells: number[];
		count: number;
		condition: 'passive' | 'active';
	};
	damage: number;
	hp: number;
	armor: number;
	level: number;
	count: number;
	about: string;
};

export type RobbersNamesType = 'Rasmus' | 'Ruben' | 'Ulf' | 'Folke';
