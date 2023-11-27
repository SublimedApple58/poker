import {useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Player from "../Player/Player";
import './Table.css'
import { ReactElement } from "react";
import Card from "../Cards/Card";
// import cardHelper from "../../helper/cardHelper";


function Table(){

    // const carteUscite = useSelector((state: RootState)=> state.carteUscite.mazzo) 
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

    function renderCard(side: number){

        const posizioneCarte: ReactElement<typeof Card>[][] = [[], [], [], []]

        let keys = 0;
        
        for(let i =0; i<posizioneGiocatori[side].length; i+=1){
            posizioneCarte[side].push(<Card  key={keys}/>);
            posizioneCarte[side].push(<Card  key={keys+1}/>);
            keys+=2;
        }

        return posizioneCarte[side].map((carte) => carte)

        // k+=2;
        // return posizioneGiocatori[side].map(() => <> <Card number={cardHelper.generateCasualCard()} key={k}/><Card number={cardHelper.generateCasualCard()} key={k+1}/> </>)
    }

    return(
        <>
             <div className='tavolo'>
                    <div className="bottomPlayer">{renderCard(2)}</div>
                    <div className="leftPlayer">{renderCard(1)}</div>
                    <div className="topPlayer">{renderCard(0)}</div>
                    <div className="rightPlayer">{renderCard(3)}</div>
             </div>
              <div className='bottom'>{renderPlayer(2)}</div>
              <div className='left'>{renderPlayer(1)}</div>
              <div className='top'>{renderPlayer(0)}</div>
              <div className='right'>{renderPlayer(3)}</div>
        </>
    )
}

export default Table;