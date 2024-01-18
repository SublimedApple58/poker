import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { moveDone, outOfManche, raiseDone, removeChips, setAllIn, setPlayerBet } from "../state/formPlayer/nPlayerSlice";
import { setRaiseCalled } from "../state/gameStatus/gameSlice";
import { Moves } from "../components/Commands/Commands";
import { player } from "../state/formPlayer/nPlayerSlice";

export function indexOfMax(arr: number[]) {
        
    let max = arr[0];
    let maxIndex = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

export default function useMoves(){

    const 
        players = useSelector((state: RootState) => state.giocatori.players),
        playerTurn = useSelector((state: RootState) => state.game.playerTurn),
        round = useSelector((state: RootState) => state.game.round),
        dispatch = useDispatch();

    function findHigherBet(){
        const scommesse: number[] = players.map(giocatore => giocatore.bet);
        const maxBet: number = players[indexOfMax(scommesse)].bet;
        return maxBet;
    }
    
    function call(){
        if(round == 1){
            dispatch(removeChips({ref: playerTurn, chips: 5}));
            dispatch(moveDone(playerTurn));
        } else {
            const playersName = players.map(giocatore => giocatore.name);
            const higher = findHigherBet();
            if(higher - players[playersName.indexOf(playerTurn)].bet > players[playersName.indexOf(playerTurn)].chips){
                alert("you don't have enough money to call, ALL IN or FOLD");
            } else {
                dispatch(removeChips({ref: playerTurn, chips: higher - players[playersName.indexOf(playerTurn)].bet}))
                dispatch(setPlayerBet({ref: playerTurn, chips: higher}));
                if((higher - players[playersName.indexOf(playerTurn)].bet) == players[playersName.indexOf(playerTurn)].chips){
                    dispatch(setAllIn(playerTurn));
                }
                dispatch(moveDone(playerTurn));
            }
        }
    }

    function raise(bet: number){
        const playersName = players.map(giocatore => giocatore.name);
        const higher = findHigherBet();
        dispatch(removeChips({ref: playerTurn, chips: higher - players[playersName.indexOf(playerTurn)].bet + bet}));
        dispatch(setPlayerBet({ref: playerTurn, chips: higher + bet}));

        dispatch(raiseDone());
        dispatch(setRaiseCalled());
    }

    function allIn(){
        if(round == 1){
            alert("you can't all in now!")
        } else {
            const playersName = players.map(giocatore => giocatore.name);
            dispatch(removeChips({ref: playerTurn, chips: players[playersName.indexOf(playerTurn)].chips}));
            dispatch(setPlayerBet({ref: playerTurn, chips: players[playersName.indexOf(playerTurn)].chips}));
    
            dispatch(raiseDone());
            dispatch(setAllIn(playerTurn));
            dispatch(setRaiseCalled());
        }
    }

    function fold(){
        dispatch(outOfManche(playerTurn));
        dispatch(moveDone(playerTurn));
    }

    function check(){
        const playersName = players.map(giocatore => giocatore.name);
        if(round != 1 && (findHigherBet() - players[playersName.indexOf(playerTurn)].bet == 0 || players[playersName.indexOf(playerTurn)].allIn)){
            dispatch(moveDone(playerTurn));
        } else {
            alert("you can't check if there's a minimum bet required to keep playing");
        }
    }

    function setMove(move: Moves, bet?: number){
        const 
            higher = findHigherBet(),
            possibleMoves: Moves[] = [Moves.fold, Moves.allIn],
            playersName = players.map(giocatore => giocatore.name),
            player: player = players[playersName.indexOf(playerTurn)];
        
        if(player.bet >= higher){
            possibleMoves.push(Moves.check, Moves.call);
            if(bet && bet <= player.chips){
                possibleMoves.push(Moves.raise);
            }
        } else if(player.chips >= higher - player.bet){
            possibleMoves.push(Moves.call);
            if(bet && (higher - player.bet) + bet){
                possibleMoves.push(Moves.raise);
            }
        }

        let possible: boolean =  false;

        for(let i = 0; i<possibleMoves.length; i++){
            move == possibleMoves[i] ? possible = true : possible;
        }

        if(possible){
            switch(move){
                case Moves.fold:
                    fold();
                    break;
                case Moves.call:
                    call();
                    break;
                case Moves.check:
                    check();
                    break;
                case Moves.allIn:
                    allIn();
                    break;
                case Moves.raise:
                    if(bet){
                        raise(bet)
                    } else {
                        alert("You need a bet to raise");
                    }
                    break;
            }
        } else {
            alert("You can't do this");
        }

    }

    return setMove;
}