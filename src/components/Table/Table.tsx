import {useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Player from "../Player/Player";
import './Table.css'
import CardContainer from "../CardContainer/CardContainer";
import { ReactElement, useEffect } from "react";
import Card from "../Cards/Card";
import cardHelper from "../../helper/cardHelper";
import { setCards } from "../../state/releasedCards/releasedSlice";
// import cardHelper from "../../helper/cardHelper";


function Table(){


    useEffect(()=>{
        dispatch(setCards(carteUscite))
    }, [])

    // const carteUscite = useSelector((state: RootState)=> state.carteUscite.mazzo)
    const
        numberPlayer = useSelector((state: RootState)=> state.giocatori.nplayer),
        carteUscite = cardHelper.generateCasualCard(numberPlayer),
        dispatch = useDispatch();

    /*
    algoritmo per scelta posizioni deve:
    mettere il primo giocatore alla posizione bottom [0], secondo posizione left [1], terzo posizione top [2], quarto posizione right [3] etc...
    */
    const posizioneGiocatori: ReactElement<typeof Player>[][] = [[], [], [], []];


    for(let i = 1; i<=numberPlayer; i++){
        const
              integerTableSide = Math.trunc(i/4),
              tableSide = 3 - (i - (integerTableSide * 4));

        if(i==1){
            posizioneGiocatori[tableSide].push(<Player isUser={true} key = {i}/>);
        } else {
            posizioneGiocatori[tableSide].push(<Player isUser={false} key = {i}/>);
        }
      }


    function renderPlayer(side: number){
        return posizioneGiocatori[side].map((player) => player)
    }

        let keys = 0;

    function renderContainer(side: number){

        const posizioneContainer: ReactElement<typeof Card>[][] = [[], [], [], []]

        for(let i =0; i<posizioneGiocatori[side].length; i+=1){
            if(side == 2){
                if(i==0){
                    posizioneContainer[side].push(<CardContainer isVisible={true} numero={carteUscite} value={keys} key={keys}/>)
                } else {
                    posizioneContainer[side].push(<CardContainer isVisible={false} numero={carteUscite} value={keys} key={keys}/>)
                }
            } else {
                posizioneContainer[side].push(<CardContainer isVisible={false} numero={carteUscite} value={keys} key={keys}/>)
            }
            keys+=2;
            
        }

        return posizioneContainer[side].map(div => div);

    }

    function renderCenterCard(){

        const carteCentrali: ReactElement[] = [];

        for(let i = 0; i<5; i++){
            if(i == 0 || i == 1){
                carteCentrali.push(<Card isVisible={true} numero={carteUscite[keys]} key={i}/>);
                keys += 1;
            } else {
                carteCentrali.push(<Card isVisible={false} numero={carteUscite[keys]} key={i}/>);
                keys += 1;
            }
            
        }

        return carteCentrali.map(carte=>carte);
    }

    return(
        <>
             <div className='tavolo'>
                    <div className="bottomPlayer">{renderContainer(2)}</div>
                    <div className="leftPlayer">{renderContainer(1)}</div>
                    <div className="topPlayer">{renderContainer(0)}</div>
                    <div className="rightPlayer">{renderContainer(3)}</div>
                    <div className="center">{renderCenterCard()}</div>
             </div>
              <div className='bottom'>{renderPlayer(2)}</div>
              <div className='left'>{renderPlayer(1)}</div>
              <div className='top'>{renderPlayer(0)}</div>
              <div className='right'>{renderPlayer(3)}</div>
        </>
    )
}

export default Table;