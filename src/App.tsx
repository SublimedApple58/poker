// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from './state/store';
import './App.css'
import Form from './components/Form/Form';
import Table from './components/Table/Table';
// import Form from './components/Form/Form'; 

function App() {

    const numberPlayer = useSelector((state: RootState)=> state.giocatori.nplayer);

  return (
    <>  
          <div className="contenitore">
              
              {numberPlayer <= 1&&  <Form />}

              {numberPlayer >= 2 && numberPlayer <= 6 && <Table />}
          </div>
    </>
  )
}

export default App;
