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
    const [turn, setTurn] = useState(false);

    let 
      stile,
      folded = {opacity: '40%'},
      notFolded = {opacity: '100%'},
      animation = {animation: 'highlight 1s ease-out infinite forwards'},
      nonAnimation = {animation: 'none'}

    useEffect(()=>{
        setInGame(false);
        setTurn(false);
        for(let i = 0; i<players.length; i++){
            players[i].name == props.name && players[i].inManche ? setInGame(true) : inGame;
        }
        for(let i = 0; i<players.length; i++){
            playerTurn == props.name && players[i].inManche ? setTurn(true) : inGame;
        }
    }, [playerTurn, round])

    const stylePlayer = props.isUser ? 'user' : 'player';
    if(inGame && turn){
        stile = Object.assign({}, notFolded, animation);
    } else if(inGame) {
        stile = Object.assign({}, notFolded, nonAnimation);
    } else {
        stile = Object.assign({}, folded, nonAnimation)
    }

    return (
        <>
                <div className={stylePlayer} style={stile}>
                    <div className="chips chipsPosition">
                        <p>{props.chips}</p>
                    </div>
                </div>
        </>
    )
}

export default Player;