import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RenderActivePerson } from '../components/gamePage/RenderActivePerson';
import { RenderEnemyBoard } from '../components/gamePage/RenderEnemyBoard';
import { RenderEnemyList } from '../components/gamePage/RenderEnemyList';
import { RenderPlayerBoard } from '../components/gamePage/RenderPlayerBoard';
import { RenderPlayerInventory } from '../components/gamePage/RenderPlayerInventory';
import { RenderPlayerList } from '../components/gamePage/RenderPlayerList';
import back1 from '../img/levels/game_background_1/game_background_1.png';
import back2 from '../img/levels/game_background_2/game_background_2.png';
import back3 from '../img/levels/game_background_3/game_background_3.png';
import back4 from '../img/levels/game_background_4/game_background_4.png';
import { ActivePotionType, UpgradeType } from '../redux/app-reducer';
import { DamageType } from '../redux/characters-reducer';
import { gameActions, HeroesType, takeDamageToEnemyThunk } from '../redux/game-reducer';
import { AppStateType } from '../redux/store';

export function GamePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // массив с возможными фонами для уровня...
  const backgrounds = [back1, back2, back3, back4];
  // background of current level ...
  const activeLocation = useSelector((state: AppStateType) => state.company.activeLocation);
  // level name...
  const levelHeader = useSelector((state: AppStateType) => state.gamePage.levelHeader);
  // const enemyDeck = useSelector((state: AppStateType) => state.gamePage.enemyDeck)
  // enemy deck ...
  const enemyBoard = useSelector((state: AppStateType) => state.gamePage.enemyBoard);
  // player deck, at start it's clear ...
  const playerBoard = useSelector((state: AppStateType) => state.gamePage.playerBoard);
  // покупка пероснажа на стол...
  const [activePerson, setActivePerson] = useState({} as HeroesType);

  const isLevelCompleted = useSelector((state: AppStateType) => state.gamePage.isLevelCompleted);
  const isLevelLost = useSelector((state: AppStateType) => state.gamePage.isLevelLost);

  //
  const [activeItem, setActiveItem] = useState({} as HeroesType | ActivePotionType | UpgradeType);
  const [activeType, setActiveType] = useState('' as 'hero' | 'potion' | 'upgrade');
  const [activeIndex, setActiveIndex] = useState(null as null | number);
  // переменные для проверки какое действие мы проводим над персонажем ...
  const [isHeroTakenOnBoard, setIsHeroTakenOnBoard] = useState(false);
  const [isPotionTakenOnBoard, setIsPotionTakenOnBoard] = useState(false);
  const [isUpgradeTakenOnBoard, setIsUpgradeTakenOnBoard] = useState(false);

  // const [isPlayerTurn, setIsPlayerTurn] = useState(true)

  // TODO временная тема, сделать всплывашки, где в случае победы, игрок получает какой-либо лут...
  if (isLevelLost) navigate('/map');
  if (isLevelCompleted) navigate('/map');

  // сетаем на доску колоду противника ...
  useEffect(() => {
    dispatch(gameActions.setEnemyOnBoard());
  }, []);

  const takeDamageToEnemy = (enemyIndex: number, damageType: DamageType, damageCount: number, heroIndex: number) => {
    dispatch(takeDamageToEnemyThunk(enemyIndex, damageType, damageCount, heroIndex));
  };

  return (
    <div className="game darken darken-2" style={{ background: `url(${backgrounds[activeLocation]}) center no-repeat` }}>
      <RenderEnemyList />

      <div className="gameContent">
        <div className="gameContentHeader">{levelHeader}</div>
        {/* /.gameContentHeader */}

        <div className="gameContentBoard">
          <div className="gameContentBoard__player">
            <RenderPlayerBoard
              board={playerBoard}
              activePerson={activePerson}
              activeItem={activeItem}
              activeType={activeType}
              activePotionIndex={activeIndex as number}
              setActiveItem={setActiveItem}
              setActiveType={setActiveType}
              isHeroTakenOnBoard={isHeroTakenOnBoard}
              setIsHeroTakenOnBoard={setIsHeroTakenOnBoard}
              isUpgradeTakenOnBoard={isUpgradeTakenOnBoard}
              setIsUpgradeTakenOnBoard={setIsUpgradeTakenOnBoard}
              isPotionTakenOnBoard={isPotionTakenOnBoard}
              setIsPotionTakenOnBoard={setIsPotionTakenOnBoard}
            />
          </div>
          <div className="gameContentBoard__enemy">
            <RenderEnemyBoard
              board={enemyBoard}
              takeDamageToEnemy={takeDamageToEnemy}
              isHeroTakenOnBoard={isHeroTakenOnBoard}
              setIsHeroTakenOnBoard={setIsHeroTakenOnBoard}
              // @ts-ignore
              activeItem={activeItem}
              activePerson={activePerson}
              setActiveItem={setActiveItem}
            />
          </div>
        </div>

        {/* /.gameContentBoard */}
        <div className="gameContentMenu">
          {isHeroTakenOnBoard
            && (
            <div className="gameContentMenu__popup">
              <div className="gameContentMenu__popupText">
                Нажмите на клетку поля, чтобы разместить персонажа
              </div>
            </div>
            )}
          {isUpgradeTakenOnBoard
            && (
            <div className="gameContentMenu__popup">
              <div className="gameContentMenu__popupText">
                Нажмите на персонажа, чтобы улучшить его
              </div>
            </div>
            )}
          {isPotionTakenOnBoard
            && (
            <div className="gameContentMenu__popup">
              <div className="gameContentMenu__popupText">
                Нажмите на персонажа, чтобы активировать зелье
              </div>
            </div>
            )}
          <RenderPlayerList
            setIsHeroTakenOnBoard={setIsHeroTakenOnBoard}
            setActivePerson={setActivePerson}
            setActiveItem={setActiveItem}
            setActiveType={setActiveType}
          />
          <RenderPlayerInventory
            setActiveItem={setActiveItem}
            setActiveType={setActiveType}
            setActiveIndex={setActiveIndex}
          />
          <RenderActivePerson
            item={activeItem}
            type={activeType}
            setIsUpgradeTakenOnBoard={setIsUpgradeTakenOnBoard}
            setIsPotionTakenOnBoard={setIsPotionTakenOnBoard}
          />
        </div>
        {/* /.gameContentMenu */}
      </div>
    </div>
  );
}

export default GamePage;
