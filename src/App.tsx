// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import './App.css'
// import Player from './components/Player/Player'; 

function App() {

    const numberPlayer = 2;



  return (
    <>  
          <div className="contenitore">
              <div className='tavolo'><div className="rows"></div></div>
              <div className='top'></div>
              <div className='bottom'></div>
              <div className='right'></div>
              <div className='left'></div>
          </div>
    </>
  )
}

export default App;
