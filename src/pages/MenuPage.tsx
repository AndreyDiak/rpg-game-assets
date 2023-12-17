import { NavLink } from 'react-router-dom';
import back1 from '../img/levels/game_background_1/game_background_1.png';

export function MenuPage() {
  const menuItems = [
    { name: 'Компания', href: 'map' },
    { name: 'Арена', href: 'arena' },
    { name: 'Аккаунт', href: 'profile' },
    { name: 'Настройки', href: 'settings' },
    { name: 'Об игре', href: 'about' },
  ];

  const gameName = 'Path of Honor';

  return (
    <div className="menu darken darken-6" style={{ background: `url(${back1})` }}>
      <div className="menuContent">
        <div className="menuContentHeader">
          <span>{gameName}</span>
        </div>
        <div className="menuContentMenu">
          {
            menuItems.map((item, index) => (
              <div className="menuContentMenu__item" key={index}>
                <NavLink to={`/${item.href}`}>
                  <button className="buttonBrown menuContentMenu__itemButton" disabled={item.href !== 'map'}>
                    {item.name}
                  </button>
                </NavLink>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
