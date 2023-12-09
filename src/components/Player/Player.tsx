import { useEffect} from 'react';
import './Player.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

function Player(props:{isUser: boolean, player: number}){

    useEffect(()=>{}, [])

    const chips = useSelector((state: RootState)=> state.giocatori.players[props.player].chips);
    const stylePlayer = props.isUser ? 'user' : 'player';

    return (
        <>
                <div className={stylePlayer}>
                    <div className="chips">
                        <p>{chips}</p>
                    </div>
                </div>
        </>
    )
}

export default Player;