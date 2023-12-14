import { useEffect} from 'react';
import './Player.css';

function Player(props:{isUser: boolean, chips: number}){

    useEffect(()=>{}, [])

    const stylePlayer = props.isUser ? 'user' : 'player';

    return (
        <>
                <div className={stylePlayer}>
                    <div className="chips">
                        <p>{props.chips}</p>
                    </div>
                </div>
        </>
    )
}

export default Player;