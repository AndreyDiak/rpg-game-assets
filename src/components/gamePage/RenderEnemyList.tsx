import { Popover } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import armor from "../../img/types/armor.png";
import hp from "../../img/types/hp.png";
import { AppStateType } from "../../redux/store";
import { RenderHpBar } from "./RenderHpBar";

export const RenderEnemyList = () => {
  const enemyDeck = useSelector((state: AppStateType) => state.gamePage.enemyDeck)
  return (
    <>
      <div className="gameList gameListEnemy">
        <div className="gameListHeader">
          Разбойники
        </div>
        {enemyDeck.map((enemy, index) => {
          return (      
              <div className="gameListBlock" key={index}>
                <div className="gameListBlock__img">
                  <img src={enemy.img} alt=""/>
                </div>
                <div className="gameListBlock__stats">
                  <div className="gameListBlock__statsHp gameListBlock__statsLine">
                    <Popover content={'Здоровье'}>
                      <img src={hp} alt=""/>
                    </Popover>
                    <RenderHpBar maxHP={enemy.hp} currentHP={enemy.currentHp} barWidth={140} color={'green'}/>
                  </div>
                  <div className="gameListBlock__statsArmor gameListBlock__statsLine">
                    <Popover content={'Броня'}>
                      <img src={armor} alt=""/>
                    </Popover>
                    <RenderHpBar maxHP={enemy.armor} currentHP={enemy.currentArmor} barWidth={140} color={'grey'}/>
                  </div>
                </div>
              </div>
          )
        })}
      </div>
    </>
  )
}