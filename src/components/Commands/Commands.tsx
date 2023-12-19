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
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        difficulty = useSelector((state: RootState) => state.game.difficulty)

    let [style, setStyle] = useState(visible); 

    useEffect(()=> {
        if(playerTurn!=1){
            setStyle(invisible);
            setTimeout(()=>{
                action(playerTurn)
            }, 1000)
        } else {
            setStyle(visible);
        }
    }, [playerTurn])

    function action(turnof: number){
        switch(difficulty) {
            case 'easy':
                easy(turnof);
                break;
            case 'medium':
                medium(turnof);
                break;
            case 'hard':
                hard(turnof);
        }
        dispatch(nextTurn(players))
    }

    function easy(turnof: number) {
        let bet = minimum;
        dispatch(removeChips({ref: turnof, chips: bet}));
    }

    function medium(turnof: number) {
        let bet = minimum + 2;
        dispatch(removeChips({ref: turnof, chips: bet}));
        dispatch(updateMin(bet));
    }

    function hard(turnof: number) {
        let bet = minimum + 5;
        dispatch(removeChips({ref: turnof, chips: bet}));
        dispatch(updateMin(bet));
    }

    function call(){
        dispatch(removeChips({ref: 1, chips: minimum}));
        dispatch(nextTurn(players));
    }

    function raise(){
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
    }

    function azione(comando: Function){
        if(playerTurn == 1){
            comando();
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
                <button onClick={() => azione(call)}>call</button>
                <button onClick={() => azione(raise)}>raise</button>
            </div>
            <div className="amount" style={style} >
                <input type="number" placeholder='Insert amount' ref={amountInput}/>
            </div>
        </>
    )
}

export default Commands;