import { useRef } from 'react';
import './commands.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import useMoves from '../../customHooks/useMoves';
import useTurn from '../../customHooks/useTurn';
import useRound from '../../customHooks/useRound';
import { Moves } from '../../modules/exports';

function Commands(){

    const 
        amountInput = useRef<HTMLInputElement | null>(null),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        setMove = useMoves(),
        style = useSelector((state: RootState) => state.game.style);

    useTurn();
    useRound();

    function raising(){
        if(Number.isNaN((amountInput.current?.valueAsNumber ?? 0)) && amountInput.current != null){
            amountInput.current.value = '0';
        } else {
            if(amountInput.current != null){
                const bet = (amountInput.current?.valueAsNumber ?? 0);
                setMove(Moves.raise, bet);
                amountInput.current.value = '0';
            }
        }
    }

    function azione(comando: void){
        if(playerTurn == 1){
            comando;
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
                <button onClick={() => azione(setMove(Moves.fold))}>fold</button>
                <button onClick={() => azione(setMove(Moves.check))}>check</button>
                <button onClick={() => azione(setMove(Moves.call))}>call</button>
                <button onClick={() => azione(raising())}>raise</button>
                <button onClick={() => azione(setMove(Moves.fold))}>All In</button>
            </div>
            <div className="amount" style={style} >
                <input type="number" placeholder='Insert amount' ref={amountInput}/>
            </div>
        </>
    )
}

export default Commands;