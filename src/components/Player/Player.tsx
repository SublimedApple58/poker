import { useEffect} from 'react';
import './Player.css';
// import { addChips, removeChips } from '../../state/Chips/ChipsSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../state/store';
// import { useDispatch } from 'react-redux';

function Player(props:{isUser: boolean}){

    useEffect(()=>{
    }, [])

    const chips = useSelector((state: RootState)=> state.chips.chips) 
    const stylePlayer = props.isUser ? 'user' : 'player';
    // const dispatch = useDispatch();

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