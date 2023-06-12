import { useEffect } from 'react';
import './App.css';
let tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close()
  }
  return (
    <div className="App">
     <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
