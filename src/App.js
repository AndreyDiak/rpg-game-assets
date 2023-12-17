import { BrowserRouter } from 'react-router-dom';
import { Main } from './components/Main';
import { Nav } from './components/Nav';

import 'antd/dist/antd.css';
import './style/style.css';
import { useEffect } from 'react';
import { setBonusesThunk } from './redux/shop-reducer';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // генерим бонусы . . .
    // @ts-ignore
    dispatch(setBonusesThunk());
  }, []);
  const isLevelStarted = useSelector((state) => state.app.isLevelStarted);

  return (
    <BrowserRouter>
      <div className="App">
        <Main />
        {!isLevelStarted && <Nav />}
      </div>
    </BrowserRouter>
  );
}

export default App;
