import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Player from "../Player/Player";
import CardContainer from "../CardContainer/CardContainer";
import { ReactElement, useEffect, useState} from "react";
import Card from "../Cards/Card";
import Commands from "../Commands/Commands";
import useTurn from '../../customHooks/useTurn';
import './Table.css';

function Table(){
    useTurn();

    const
        players = useSelector((state: RootState)=> state.giocatori.players),
        centralChips = useSelector((state: RootState) => state.giocatori.centralChips),
        centralCards = useSelector((state: RootState)=> state.giocatori.centralCards),
        playersInGame = useSelector((state: RootState) => state.giocatori.players.filter(giocatore => giocatore.inGame)),
        [endGame, setEndGame] = useState(false),
        winner = useSelector((state: RootState) => state.giocatori.players.filter(giocatore => giocatore.inGame)[0]);
    
    let 
      styleTable = {},
      styleEnd = {};

    useEffect(() => {
        if(playersInGame.length == 1){
            setTimeout(() => {
                setEndGame(true);
            }, 2000)
        }
    }, [playersInGame]);

        styleTable = endGame ? {opacity: '0'} : {animation: 'apparizione 3s ease-out 1 forwards'};
        styleEnd = endGame ? {opacity: '1'} : {opacity: '0'};

    function renderPlayer(side: number) : ReactElement[] {
        return players.filter(player => player.side === side).map((player, i) => <Player name={player.name} isUser={player.isUser} key={i} chips={player.chips}/>);
    }

    function renderContainer(side: number) : ReactElement[] {
        return players.filter(player => player.side === side).map((player, i) => <CardContainer isVisible={player.isVisible} numero={player.carte} key={i}/>);
    }

    function renderCenterCard() : ReactElement[] {
        return centralCards.map((carta, i) => <Card isVisible={carta.isVisible} numero={carta.numero} key={i}/>);
    }
    

    return(
        <>
                <div className='tavolo' style={styleTable}>
                    <div className="bottomPlayer">{renderContainer(2)}</div>
                    <div className="leftPlayer">{renderContainer(1)}</div>
                    <div className="topPlayer">{renderContainer(0)}</div>
                    <div className="rightPlayer">{renderContainer(3)}</div>
                    <div className="center">{renderCenterCard()} <div className="chips chipsPosition centrali"><p>{centralChips}</p></div></div>
                </div>
                <div className="textEndGame" style={styleEnd}><h1>PLAYER NUMBER {winner.name} WON THE GAME</h1></div>
                <div className='bottom' style={styleTable}>{renderPlayer(2)}</div>
                <div className='left' style={styleTable}>{renderPlayer(1)}</div>
                <div className='top' style={styleTable}>{renderPlayer(0)}</div>
                <div className='right' style={styleTable}>{renderPlayer(3)}</div>
                {/* <div className="turno" style={styleTable}>
                    <h1>Turno: giocatore {playerTurn}</h1>
                    <h1>Round {round}</h1>
                    <h1>Turns: {turns}</h1>
                    <h1>manche: {manche}</h1>
                </div> */}
                <Commands/>
        </>
    )
}

export default Table;