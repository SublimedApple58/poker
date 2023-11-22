import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Player from "../Player/Player";
import './Table.css'

function Table(){

    const numberPlayer = useSelector((state: RootState)=> state.giocatori.nplayer);
    /* 
    algoritmo per scelta posizioni deve:
    mettere il primo giocatore alla posizione bottom [0], secondo posizione left [1], terzo posizione top [2], quarto posizione right [3] etc...
    */
    let posizioneGiocatori: number[][] = [[], [], [], []]
    let conto = 0
    for(let i = 1; i<=numberPlayer; i++){
      if(conto>3){
        conto = 0;
      }
      posizioneGiocatori[conto].push(1)
      // posizioneGiocatori[conto].push(1); 
      conto++
    }

    console.log(posizioneGiocatori)
    let keys = 0

    return(
        <>
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
        </>
    )
}

export default Table;