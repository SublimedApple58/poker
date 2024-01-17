import { useRef } from 'react';
import './commands.css';
import { useDispatch, useSelector } from 'react-redux';
import { raiseDone, removeChips, setPlayerBet } from '../../state/formPlayer/nPlayerSlice';
import { RootState } from '../../state/store';
import { setRaiseCalled } from '../../state/gameStatus/gameSlice';
import { indexOfMax } from '../../customHooks/useMoves';
import useMoves from '../../customHooks/useMoves';
import useTurn from '../../customHooks/useTurn';

export enum Moves{
    check,
    fold, 
    allIn,
    raise,
    call
}

function Commands(){

    const 
        amountInput = useRef<HTMLInputElement | null>(null),
        dispatch = useDispatch(),
        players = useSelector((state: RootState)=> state.giocatori.players),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        round = useSelector((state: RootState) => state.game.round),
        setMove = useMoves(),
        style = useSelector((state: RootState) => state.game.style);

    useTurn();

    function findHigherBet(){
        const scommesse: number[] = players.map(giocatore => giocatore.bet);
        const maxBet: number = players[indexOfMax(scommesse)].bet;
        return maxBet;
    }

    function raising(){
        if(Number.isNaN((amountInput.current?.valueAsNumber ?? 0)) && amountInput.current != null){
            amountInput.current.value = '0';
        } else {
            const playersName = players.map(giocatore => giocatore.name);
            if(amountInput.current != null){
                const higher = findHigherBet();
                const bet = (amountInput.current?.valueAsNumber ?? 0);
                if((higher - players[playersName.indexOf(playerTurn)].bet + bet)>players[playersName.indexOf(playerTurn)].chips){
                    alert("you don't have enough money");
                } else if(round == 1 && bet<5){
                    alert("The minimum amount of money to bet to partecipate is 5 chips");
                } else {
                    dispatch(removeChips({ref: playerTurn, chips: higher - players[playersName.indexOf(playerTurn)].bet + bet}));
                    dispatch(setPlayerBet({ref: playerTurn, chips: higher + bet}));
                    amountInput.current.value = '0';
                    dispatch(raiseDone());
                    dispatch(setRaiseCalled());
                }
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