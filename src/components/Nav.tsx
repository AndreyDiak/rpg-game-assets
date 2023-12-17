import {NavLink} from "react-router-dom"

import './../style/Nav.css'

export const Nav = () => {

  return (
    <div className="nav">
      <div className="navItem">
        <NavLink to='/smithy'>
          Кузница
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/deck'>
          Колода
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/menu'>
          Меню
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/shop'>
          Магазин
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to='/profile'>
          Аккаунт
        </NavLink>
      </div>
    </div>
  )
}