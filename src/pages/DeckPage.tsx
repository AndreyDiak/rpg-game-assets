/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { CharacterCard } from '../components/deckPage/CharacterCard';
import { RenderDeck } from '../components/deckPage/RenderDeck';
import { CharacterCardInfo } from '../components/deckPage/CharacterCardInfo';
import { CharacterType, filterCardsThunk } from '../redux/characters-reducer';
import { AppStateType } from '../redux/store';

import { FilterType, profileActions } from '../redux/profile-reducer';
import { RenderCards } from '../components/deckPage/RenderCards';
import { RenderPlayerInventory } from '../components/gamePage/RenderPlayerInventory';
import { RenderPotions } from '../components/deckPage/RenderPotions';

export const DeckPage = React.memo(() => {
	const gameCardsFilteredList = useSelector(
		(state: AppStateType) => state.characters.filteredCards,
	) as CharacterType[];
	const gameCardsList = useSelector(
		(state: AppStateType) => state.characters.charactersList,
	) as CharacterType[];
	const playerCardsFilteredList = useSelector(
		(state: AppStateType) => state.profile.filteredCards,
	) as CharacterType[];
	const playerDeck = useSelector(
		(state: AppStateType) => state.profile.deck.cards,
	) as CharacterType[];

	const [isCardInfoShown, setIsCardInfoShown] = useState(false);
	const [activeCard, setActiveCard] = useState<null | CharacterType>(null);
	const [activeFilter, setActiveFilter] = useState<FilterType>('rarity');
	const [isCardReplaced, setIsCardReplaced] = useState(false);

	// настроить фильтр...
	const dispatch = useDispatch();

	const filterCards = useCallback(
		(filter: FilterType) => dispatch(profileActions.filterCards(filter)),
		[dispatch],
	);

	useEffect(() => {
		filterCards(activeFilter);
	}, [activeFilter]);

	useEffect(() => {
		dispatch(filterCardsThunk());
	}, []);

	return (
		<div className="deck darken darken-4">
			<CharacterCardInfo
				// @ts-ignore
				character={activeCard}
				isCardInfoShown={isCardInfoShown}
				setIsCardInfoShown={setIsCardInfoShown}
				setIsCardReplaced={setIsCardReplaced}
			/>
			<div className="deckContent darken darken-6">
				<div className="deckHeader">Колода</div>
				<RenderDeck
					deck={playerDeck}
					// @ts-ignore
					activeCard={activeCard}
					setActiveCard={setActiveCard}
					isCardReplaced={isCardReplaced}
					setIsCardReplaced={setIsCardReplaced}
					setIsCardInfoShown={setIsCardInfoShown}
				/>
				{!isCardReplaced ? (
					<>
						<RenderPotions />
						<div className="deckHeader">Коллекция карт</div>
						<div className="deckFilter">
							<div className="deckFilter__button">
								<button
									onClick={() => {
										activeFilter === 'level'
											? setActiveFilter('rarity')
											: activeFilter === 'rarity'
											? setActiveFilter('type')
											: setActiveFilter('level');
									}}
								>
									{activeFilter === 'level' && 'По уровню'}
									{activeFilter === 'rarity' && 'По редкости'}
									{activeFilter === 'type' && 'По типу'}
								</button>
							</div>
							<div className="deckFilter__stats">
								(Найдено: {playerCardsFilteredList.length} / {gameCardsList.length})
							</div>
						</div>
						<RenderCards
							cards={playerCardsFilteredList}
							setActiveCard={setActiveCard}
							setIsCardInfoShown={setIsCardInfoShown}
							visible
							isCardReplaced={isCardReplaced}
						/>
						<div className="deckHeader">Предстоит найти</div>
						<RenderCards
							cards={gameCardsFilteredList}
							setActiveCard={setActiveCard}
							setIsCardInfoShown={setIsCardInfoShown}
							visible={false}
							isCardReplaced={isCardReplaced}
						/>
					</>
				) : (
					<>
						<div className="deckHeader">Выберете карту</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								paddingTop: '30px',
								height: '50vh',
							}}
						>
							<CharacterCard
								/*  @ts-ignore */
								character={activeCard}
								setIsCardInfoShown={setIsCardInfoShown}
								setActiveCard={setActiveCard}
								visible
								isCardReplaced={isCardReplaced}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
});
