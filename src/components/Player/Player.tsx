import { useEffect} from 'react';
import './Player.css';

function Player(props:{isUser: boolean, nPlayer: number}){

    useEffect(()=>{}, [])

    const chips = 100;
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