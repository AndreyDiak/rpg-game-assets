import {Modal} from "antd";
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {NavLink} from "react-router-dom";
import {LevelType} from "../../redux/company-reducer";
import {gameActions, setEnemyDeckThunk, setPlayerDeckThunk} from "../../redux/game-reducer";
import {appAction} from "../../redux/app-reducer";

export type LocationInfoType = {
  activeLocation: any
  isLocationInfoShown: boolean
  setIsActiveLocationShown: (isLocationInfoShown: boolean) => void
}

export const LocationInfo : FC<LocationInfoType> = ({activeLocation, isLocationInfoShown, setIsActiveLocationShown}) => {

  const locations = useSelector((state: AppStateType) => state.company.locations)
  const dispatch = useDispatch()

  const onModalClose = () => {
    setIsActiveLocationShown(false)
  }

  const onButtonClick = (level: LevelType) => {
    dispatch(gameActions.restartLevel())
    dispatch(appAction.setIsLevelStarted(true))
    dispatch(setEnemyDeckThunk(level))
    dispatch(setPlayerDeckThunk())
  }

  // TODO реализовать показывание всех уровней, но при нажатии одного из них мы либо
  // проверяем может ли игрок пройти его либо открываем подробную информация с противниками
  // и так далее...

  return (
    <>
      <Modal
        title={activeLocation ? locations[activeLocation].title : ''}
        visible={isLocationInfoShown}
        onOk={onModalClose}
        onCancel={onModalClose}
        footer={null}
        bodyStyle={{padding: '0px'}}
        width={500}
      >
        {activeLocation !== null
        &&
          <div className='mapLocation darken darken-4'>
            <div className="mapLocation__title">
              {locations[activeLocation].title}
            </div>
            <div className='mapLocation__levels' >
              {locations[activeLocation].levels.map((level: LevelType, index) => {
                return (
                  <div key={index} className='mapLocation__level'>
                    <div className="mapLocation__levelTitle">
                      <b>{level.bandTitle}</b>
                    </div>
                    <div className="mapLocation__levelInfo">
                      <div className="mapLocation__levelInfo__names">
                        {/* выводим имена противников . . . */}
                        {level.bandDeck.map((deck, deckIndex) => {
                          return (
                            <div key={deckIndex} className='mapLocation__levelInfo__name'>
                              {deck.name}
                            </div>
                          )
                        })}
                      </div>
                      { // первый уровень всегда открыт / далее уровень открыт если предыдущий уровень уже пройден . . .
                        index > 0
                          ?  locations[activeLocation].levels[index - 1].completed
                          && <div className="mapLocation__levelInfoButton">
                                <NavLink to='/game'>
                                  <button className="buttonBrown" onClick={() => onButtonClick(level)}>
                                    Играть
                                  </button>
                                </NavLink>
                              </div>
                          : <div className="mapLocation__levelInfoButton">
                            <NavLink to='/game'>
                              <button className="buttonBrown" onClick={() => onButtonClick(level)}>
                                Играть
                              </button>
                            </NavLink>
                          </div>
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        }
      </Modal>
    </>
  )
}

// const RenderLevelButton = () => {
//   return (
//     <>

//     </>
//   )
// }