import { useEffect, useState} from 'react';
import './Player.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function Player(props:{name: number, isUser: boolean, chips: number}){

    const 
      playerTurn = useSelector((state: RootState) => state.game.playerTurn),
      players = useSelector((state: RootState) => state.giocatori.players),
      round = useSelector((state: RootState) => state.game.round);
    
    const [inGame, setInGame] = useState(false);

    useEffect(()=>{
        setInGame(false);
        for(let i = 0; i<players.length; i++){
            players[i].name == props.name && players[i].inManche ? setInGame(true) : inGame;
        }
    }, [playerTurn, round])

    const 
      stylePlayer = props.isUser ? 'user' : 'player',
      stile = inGame ? {opacity: '100%'} : {opacity: '50%'}

    return (
        <>
                <div className={stylePlayer} style={stile}>
                    <div className="chips">
                        <p>{props.chips}</p>
                    </div>
                </div>
        </>
    )
}

export default Player;