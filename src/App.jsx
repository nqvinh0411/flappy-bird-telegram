import { useEffect, useState } from 'react';
import Game from './components/Game';

function App() {
  const [telegramUser, setTelegramUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      tg.expand();
      
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramUser(user);
        console.log('Telegram User:', user);
      }
    }
  }, []);

  return (
    <div className="app">
      <Game telegramUser={telegramUser} />
    </div>
  );
}

export default App;
