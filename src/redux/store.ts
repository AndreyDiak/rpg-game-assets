import { forgeReducer } from './forge-reducer';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleWare from "redux-thunk"
import { charactersReducer } from './characters-reducer'
import {profileReducer} from "./profile-reducer";
import { shopReducer } from './shop-reducer';
import {appReducer} from "./app-reducer";
import {companyReducer} from "./company-reducer";
import {gameReducer} from "./game-reducer";

let rootReducer = combineReducers({
  characters: charactersReducer,
  profile: profileReducer,
  company: companyReducer,
  shopPage: shopReducer,
  gamePage: gameReducer,
  forgePage: forgeReducer,
  app: appReducer
})

type RootReduceType = typeof rootReducer
export type AppStateType = ReturnType<RootReduceType>


type PropsType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropsType<T>>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))
// тестовый билд без разрешения
// const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleWare)))

// @ts-ignore
window.store = store

export default store