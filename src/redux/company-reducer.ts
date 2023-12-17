import back1 from '../img/levels/game_background_1/game_background_1.png';
import back2 from '../img/levels/game_background_2/game_background_2.png';
import back3 from '../img/levels/game_background_3/game_background_3.png';
import back4 from '../img/levels/game_background_4/game_background_4.png';
import { RobbersNamesType } from './characters-reducer';
import { InferActionType } from './store';

const SET_ACTIVE_LOCATION = 'companyPage/SET_ACTIVE_LOCATION';

let initialState = {
	locations: [
		// 4 разные локации . . .
		{
			title: 'Развалины вархейма',
			background: back1,
			levels: [
				// здесь хранятся объекты с информацией об противнках на каждом уровне . . .
				{
					bandTitle: 'Разбойник одиночка',
					bandDifficulty: 1,
					completed: true,
					availableBalance: 200,
					bandDeck: [{ name: 'Ruben' as RobbersNamesType, level: 1, boardIndex: 5 }],
				},
				{
					bandTitle: 'Лесной разбойник',
					bandDifficulty: 1.2,
					completed: true,
					availableBalance: 250,
					bandDeck: [{ name: 'Ruben' as RobbersNamesType, level: 2, boardIndex: 9 }],
				},
				{
					bandTitle: 'Разбойники с полей',
					bandDifficulty: 1.4,
					completed: true,
					availableBalance: 300,
					bandDeck: [
						{ name: 'Ruben' as RobbersNamesType, level: 1, boardIndex: 5 },
						{ name: 'Rasmus' as RobbersNamesType, level: 1, boardIndex: 9 },
					],
				},
				{
					bandTitle: 'Бандиты с полей',
					bandDifficulty: 1.6,
					completed: true,
					availableBalance: 350,
					bandDeck: [
						{ name: 'Ruben' as RobbersNamesType, level: 2, boardIndex: 6 },
						{ name: 'Rasmus' as RobbersNamesType, level: 2, boardIndex: 10 },
					],
				},
				{
					bandTitle: 'Бандиты',
					bandDifficulty: 1.8,
					completed: true,
					availableBalance: 400,
					bandDeck: [
						{ name: 'Ruben' as RobbersNamesType, level: 3, boardIndex: 5 },
						{ name: 'Rasmus' as RobbersNamesType, level: 2, boardIndex: 10 },
					],
				},
				{
					bandTitle: 'Малая шайка грабитилей',
					bandDifficulty: 2,
					completed: true,
					availableBalance: 450,
					bandDeck: [
						{ name: 'Ruben' as RobbersNamesType, level: 2, boardIndex: 14 },
						{ name: 'Ruben' as RobbersNamesType, level: 2, boardIndex: 9 },
						{ name: 'Rasmus' as RobbersNamesType, level: 2, boardIndex: 5 },
					],
				},
				{
					bandTitle: 'Громилы западной дороги',
					bandDifficulty: 2.2,
					completed: true,
					availableBalance: 500,
					bandDeck: [
						{ name: 'Ruben' as RobbersNamesType, level: 3, boardIndex: 3 },
						{ name: 'Ulf' as RobbersNamesType, level: 3, boardIndex: 6 },
						{ name: 'Rasmus' as RobbersNamesType, level: 2, boardIndex: 9 },
					],
				},
				{
					bandTitle: 'Громилы из леса',
					bandDifficulty: 2.4,
					completed: true,
					availableBalance: 550,
					bandDeck: [
						{ name: 'Ulf' as RobbersNamesType, level: 3, boardIndex: 10 },
						{ name: 'Ruben' as RobbersNamesType, level: 4, boardIndex: 5 },
						{ name: 'Folke' as RobbersNamesType, level: 1, boardIndex: 0 },
					],
				},
				{
					bandTitle: 'Труппа разбойников',
					bandDifficulty: 2,
					completed: true,
					availableBalance: 600,
					bandDeck: [
						{ name: 'Ruben' as RobbersNamesType, level: 1, boardIndex: 5 },
						{ name: 'Ruben' as RobbersNamesType, level: 1, boardIndex: 6 },
						{ name: 'Ulf' as RobbersNamesType, level: 4, boardIndex: 9 },
						{ name: 'Folke' as RobbersNamesType, level: 4, boardIndex: 10 },
					],
				},
				{
					bandTitle: 'Банда западного побережья',
					bandDifficulty: 2.6,
					completed: true,
					availableBalance: 650,
					bandDeck: [
						{ name: 'Ulf' as RobbersNamesType, level: 2, boardIndex: 1 },
						{ name: 'Rasmus' as RobbersNamesType, level: 2, boardIndex: 5 },
						{ name: 'Ruben' as RobbersNamesType, level: 3, boardIndex: 9 },
						{ name: 'Folke' as RobbersNamesType, level: 3, boardIndex: 13 },
						{ name: 'Folke' as RobbersNamesType, level: 4, boardIndex: 15 },
					],
				},
				{
					bandTitle: 'Элитные бандиты',
					bandDifficulty: 2.8,
					completed: true,
					availableBalance: 700,
					bandDeck: [
						{ name: 'Ulf' as RobbersNamesType, level: 4, boardIndex: 5 },
						{ name: 'Rasmus' as RobbersNamesType, level: 4, boardIndex: 12 },
						{ name: 'Folke' as RobbersNamesType, level: 3, boardIndex: 8 },
						{ name: 'Folke' as RobbersNamesType, level: 3, boardIndex: 4 },
						{ name: 'Folke' as RobbersNamesType, level: 3, boardIndex: 0 },
					],
				},
				{
					bandTitle: 'Элитные громилы',
					bandDifficulty: 3.0,
					completed: true,
					availableBalance: 800,
					bandDeck: [
						{ name: 'Folke' as RobbersNamesType, level: 3, boardIndex: 4 },
						{ name: 'Folke' as RobbersNamesType, level: 3, boardIndex: 1 },
						{ name: 'Folke' as RobbersNamesType, level: 4, boardIndex: 6 },
						{ name: 'Folke' as RobbersNamesType, level: 3, boardIndex: 10 },
						{ name: 'Folke' as RobbersNamesType, level: 4, boardIndex: 13 },
					],
				},
			] as LevelType[],
		},
		{
			title: 'Небесные острова',
			background: back2,
			levels: [
				// здесь хранятся объекты с информацией об противнках на каждом уровне . . .
				{
					bandTitle: '',
					bandDifficulty: 1,
					completed: false,
					availableBalance: 0,
					bandDeck: [{}, {}, {}, {}, {}],
				},
			] as LevelType[],
		},
		{
			title: 'Академия',
			background: back3,
			levels: [
				// здесь хранятся объекты с информацией об противнках на каждом уровне . . .
				{
					bandTitle: '',
					bandDifficulty: 1,
					completed: false,
					availableBalance: 0,
					bandDeck: [{}, {}, {}, {}, {}],
				},
			] as LevelType[],
		},
		{
			title: 'Королевские поля',
			background: back4,
			levels: [
				// здесь хранятся объекты с информацией об противнках на каждом уровне . . .
				{
					bandTitle: '',
					bandDifficulty: 1,
					completed: false,
					availableBalance: 0,
					bandDeck: [{}, {}, {}, {}, {}],
				},
			] as LevelType[],
		},
	],
	activeLocation: 0,
};

export type InitialCompanyStateType = typeof initialState;

export const companyReducer = (
	state = initialState,
	action: CompanyActionType,
): InitialCompanyStateType => {
	switch (action.type) {
		case SET_ACTIVE_LOCATION:
			return {
				...state,
				activeLocation: action.activeLocation,
			};
		default:
			return state;
	}
};

export const companyActions = {
	setActiveLocation: (activeLocation: number) =>
		({ type: SET_ACTIVE_LOCATION, activeLocation } as const),
};

type CompanyActionType = InferActionType<typeof companyActions>;
// type CompanyThunkType = ThunkAction<any, AppStateType, unknown, CompanyActionType>
export type LevelType = {
	bandTitle: string;
	bandDifficulty: number;
	completed: boolean;
	availableBalance: number;
	bandDeck: { name: RobbersNamesType; level: number; boardIndex: number }[];
};
