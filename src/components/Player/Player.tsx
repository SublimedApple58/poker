import { useEffect, useState} from 'react';
import './Player.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function Player(props:{name: number, isUser: boolean, chips: number}){

    const 
      playerTurn = useSelector((state: RootState) => state.game.playerTurn),
      playersInManche = useSelector((state: RootState) => state.giocatori.playersInManche);
    
    const [inGame, setInGame] = useState(false);

    useEffect(()=>{
        setInGame(false);
        for(let i = 0; i<playersInManche.length; i++){
            playersInManche[i] == props.name ? setInGame(true) : inGame;
        }
    }, [playerTurn])

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