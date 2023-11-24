import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Player from "../Player/Player";
import './Table.css'
import { ReactElement } from "react";
import Card from "../Cards/Card";
import cardHelper from "../../helper/cardHelper";

function Table(){

    const numberPlayer = useSelector((state: RootState)=> state.giocatori.nplayer);
    /* 
    algoritmo per scelta posizioni deve:
    mettere il primo giocatore alla posizione bottom [0], secondo posizione left [1], terzo posizione top [2], quarto posizione right [3] etc...
    */
    const posizioneGiocatori: ReactElement<typeof Player>[][] = [[], [], [], []];

    for(let i = 1; i<=numberPlayer; i++){
      const
            integerTableSide = Math.trunc(i/4),
            tableSide = 3 - (i - (integerTableSide * 4));

      posizioneGiocatori[tableSide].push(<Player key = {i}/>);
    }

    function renderPlayer(side: number){
        return posizioneGiocatori[side].map((player) => player)
    }

    return(
        <>
             <div className='tavolo'>
                <div className="bottomPlayer">
                    <Card number={cardHelper.generateCasualCard()}/>
                    <Card number={cardHelper.generateCasualCard()}/>
                </div>
                <div className="topPlayer"></div>
                <div className="leftPlayer"></div>
                <div className="rightPlayer"></div>
             </div>
              <div className='bottom'>{renderPlayer(2)}</div>
              <div className='left'>{renderPlayer(1)}</div>
              <div className='top'>{renderPlayer(0)}</div>
              <div className='right'>{renderPlayer(3)}</div>
        </>
    )
}

export default Table;