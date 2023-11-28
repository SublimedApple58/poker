import { useEffect} from 'react';
import './Player.css'

function Player(props:{isUser: boolean}){

    useEffect(()=>{
    }, [])

    const stylePlayer = props.isUser ? 'user' : 'player';

    return (
        <>
                <div className={stylePlayer}></div>
        </>
    )
}

export default Player;