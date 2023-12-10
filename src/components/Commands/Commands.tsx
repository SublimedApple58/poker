import { useEffect, useRef } from 'react';
import './commands.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeChips} from '../../state/formPlayer/nPlayerSlice';
import { RootState } from '../../state/store';
import { nextTurn, updateMin } from '../../state/gameStatus/gameSlice';

function Commands(){

    const 
        amountInput = useRef<HTMLInputElement | null>(null),
        // invisible = {
        //     opacity: '0'
        // },
        visible = {
            opacity: '1'
        },
        dispatch = useDispatch(),
        minimum = useSelector((state: RootState)=> state.game.lastBet),
        players = useSelector((state: RootState)=> state.giocatori.players.length),
        turn = useSelector((state: RootState)=> state.game.turn)
    // let [style, setStyle] = useState(invisible); 

    useEffect(()=> {
        if(turn!=1){
            setTimeout(()=>{
                dispatch(removeChips({ref: turn, chips: minimum}));
                dispatch(nextTurn(players));
            }, 2000)
        }
    }, [turn])

    function amounting(){
        // if(style==invisible){
        //     setStyle(visible)
        // } else {
        //     setStyle(invisible)
        // }
        if(turn ==  1){ 
            if(Number.isNaN((amountInput.current?.valueAsNumber ?? 0)) && amountInput.current != null){
                amountInput.current.value = '0';
            } else {
                if((amountInput.current?.valueAsNumber ?? 0)<minimum){
                    alert(`your bet must be a minimum of ${minimum}`)
                } else if(amountInput.current != null){
                    dispatch(updateMin(amountInput.current.valueAsNumber))
                    dispatch(removeChips({ref: 1, chips: (amountInput.current?.valueAsNumber ?? 0)}));
                    amountInput.current.value = '0';
                }
            }
        } else {
            alert("It's not your turn")
            if(Number.isNaN((amountInput.current?.valueAsNumber ?? 0)) && amountInput.current != null){
                amountInput.current.value = '0';
            } else if(amountInput.current != null){
                amountInput.current.value = '0';
            }
        }
    }

    return (
        <>
            <div className="commands">
                <button>fold</button>
                <button>check</button>
                <button onClick={()=>{amounting(); dispatch(nextTurn(players))}}>call</button>
                <button>raise</button>
            </div>
            <div className="amount" style={visible} >
                <input type="number" placeholder='Insert amount' ref={amountInput}/>
            </div>
        </>
    )
}

export default Commands;