// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { RootState } from './state/store';
import { choise } from './state/formPlayer/playerSlice';
import { useRef } from 'react'
import './App.css'
import Player from './components/Player/Player'; 

function App() {

    const numberPlayer = useSelector((state: RootState)=> state.giocatori.nplayer);
    const riferimento = useRef(null);
    const dispatch = useDispatch();


    let posizioneGiocatori: number[][] = [[], [], [], []]

    /* 

    algoritmo per scelta posizioni deve:
    mettere il primo giocatore alla posizione bottom [0], secondo posizione left [1], terzo posizione top [2], quarto posizione right [3] etc...

    */
    let conto = 0
    for(let i = 1; i<=numberPlayer; i++){
      if(conto>3){
        conto = 0;
      }
      posizioneGiocatori[conto].push(1)
      // posizioneGiocatori[conto].push(1); 
      conto++
    }

    const styleBottone ={
      color: "black"
    }

    const styleInput = {
      color: "black"
    }

    console.log(posizioneGiocatori)
    let keys = 0
    

  return (
    <>  
          <div className="contenitore">
          <div className="form">
            <input type="number" ref={riferimento}  style={styleInput}/>
            <button style={styleBottone} onClick={()=>dispatch(choise(riferimento.current!.value))}>conferma giocatori</button>
          </div>
              <div className='tavolo'><div className="rows"></div></div>
              <div className='bottom'>{posizioneGiocatori[0].map(()=>{
                keys++
               return <Player key={keys}/>
              })}</div>
              <div className='left'>{posizioneGiocatori[1].map(()=>{
                keys++
               return <Player key={keys}/>
              })}</div>
              <div className='top'>{posizioneGiocatori[2].map(()=>{
                keys++
               return <Player key={keys}/>
              })}</div>
              <div className='right'>{posizioneGiocatori[3].map(()=>{
                keys++
               return <Player key={keys}/>
              })}</div>
          </div>
    </>
  )
}

export default App;
