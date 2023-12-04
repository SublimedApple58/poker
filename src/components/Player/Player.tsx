import { useEffect} from 'react';
import './Player.css'

function Player(props:{isUser: boolean}){

    useEffect(()=>{
    }, [])

    const chips: number = 100; 
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