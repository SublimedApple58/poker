import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import Player from "../Player/Player";
import CardContainer from "../CardContainer/CardContainer";
import { ReactElement} from "react";
import Card from "../Cards/Card";
import Commands from "../Commands/Commands";
import './Table.css';

function Table(){
    const
        players = useSelector((state: RootState)=> state.giocatori.players),
        centralChips = useSelector((state: RootState) => state.giocatori.centralChips),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        round = useSelector((state: RootState)=> state.game.round),
        manche = useSelector((state: RootState)=> state.game.manche),
        centralCards = useSelector((state: RootState)=> state.giocatori.centralCards),
        turns = useSelector((state: RootState)=> state.game.turns)

    function renderPlayer(side: number) : ReactElement[] {
        return players.filter(player => player.side === side).map((player, i) => <Player isUser={player.isVisible} key={i} chips={player.chips}/>);
    }

    function renderContainer(side: number) : ReactElement[] {
        return players.filter(player => player.side === side).map((player, i) => <CardContainer isVisible={player.isVisible} numero={player.carte} key={i}/>);
    }

    function renderCenterCard() : ReactElement[] {
        return centralCards.map((carta, i) => <Card isVisible={carta.isVisible} numero={carta.numero} key={i}/>);
    }

    return(
        <>
             <div className='tavolo'>
                    <div className="bottomPlayer">{renderContainer(2)}</div>
                    <div className="leftPlayer">{renderContainer(1)}</div>
                    <div className="topPlayer">{renderContainer(0)}</div>
                    <div className="rightPlayer">{renderContainer(3)}</div>
                    <div className="center">{renderCenterCard()} <div className="chips centrali"><p>{centralChips}</p></div></div>
             </div>
              <div className='bottom'>{renderPlayer(2)}</div>
              <div className='left'>{renderPlayer(1)}</div>
              <div className='top'>{renderPlayer(0)}</div>
              <div className='right'>{renderPlayer(3)}</div>
              <div className="turno">
                <h1>Turno: giocatore {playerTurn}</h1>
                <h1>Round {round}</h1>
                <h1>Turns: {turns}</h1>
                <h1>manche: {manche}</h1>
              </div>
              <Commands/>
        </>
    )
}

export default Table;