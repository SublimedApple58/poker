import { useEffect, useRef, useState } from 'react';
import './commands.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeChips} from '../../state/formPlayer/nPlayerSlice';
import { RootState } from '../../state/store';
import { nextTurn, updateMin } from '../../state/gameStatus/gameSlice';

function Commands(){

    const 
        amountInput = useRef<HTMLInputElement | null>(null),
        invisible = {
            opacity: '0'
        },
        visible = {
            opacity: '1'
        },
        dispatch = useDispatch(),
        minimum = useSelector((state: RootState)=> state.game.lastBet),
        players = useSelector((state: RootState)=> state.giocatori.players.length),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn)

    let [style, setStyle] = useState(visible); 

    useEffect(()=> {
        if(playerTurn!=1){
            setStyle(invisible);
            setTimeout(()=>{
                action(playerTurn)
            }, 2000)
        } else {
            setStyle(visible);
        }
    }, [playerTurn])

    function action(turnof: number){
        dispatch(removeChips({ref: turnof, chips: minimum}));
        dispatch(nextTurn(players))
    }

    function amounting(){
        if(playerTurn ==  1){ 
            if(Number.isNaN((amountInput.current?.valueAsNumber ?? 0)) && amountInput.current != null){
                amountInput.current.value = '0';
            } else {
                if((amountInput.current?.valueAsNumber ?? 0)<minimum){
                    alert(`your bet must be a minimum of ${minimum}`)
                } else if(amountInput.current != null){
                    dispatch(updateMin(amountInput.current.valueAsNumber))
                    dispatch(removeChips({ref: 1, chips: (amountInput.current?.valueAsNumber ?? 0)}));
                    amountInput.current.value = '0';
                    dispatch(nextTurn(players));
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
            <div className="commands" style={style}>
                <button>fold</button>
                <button>check</button>
                <button onClick={amounting}>call</button>
                <button>raise</button>
            </div>
            <div className="amount" style={style} >
                <input type="number" placeholder='Insert amount' ref={amountInput}/>
            </div>
        </>
    )
}

export default Commands;