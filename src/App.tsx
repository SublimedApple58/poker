// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from './state/store';
import './App.css'
import Form from './components/Form/Form';
import Table from './components/Table/Table';
// import EndGame from './components/EndGame/EndGame';  

function App() {

    const 
      numberPlayer = useSelector((state: RootState)=> state.giocatori.players.length);
      // playersInGame = useSelector((state: RootState) => state.giocatori.players.filter(giocatore => giocatore.inGame))

  return (
    <>  
          <div className="contenitore">       
              {numberPlayer <= 2 && <Form />}
              {numberPlayer >= 3 && numberPlayer <=8 && <Table />}
              {/* {playersInGame.length == 1 && <EndGame />}  */}
          </div>
    </>
  )
}

export default App;