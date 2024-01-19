import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { moveDone, outOfManche, raiseDone, removeChips, setAllIn, setPlayerBet } from "../state/formPlayer/nPlayerSlice";
import { setRaiseCalled } from "../state/gameStatus/gameSlice";
import { Moves } from "../modules/exports";
import { player, indexOfMax } from "../modules/exports";

export default function useMoves(){

    const 
        players = useSelector((state: RootState) => state.giocatori.players),
        playerTurn = useSelector((state: RootState) => state.game.playerTurn),
        round = useSelector((state: RootState) => state.game.round),
        dispatch = useDispatch(),
        playersName = players.map(giocatore => giocatore.name);

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
            const higher = findHigherBet();
            dispatch(removeChips({ref: playerTurn, chips: higher - players[playersName.indexOf(playerTurn)].bet}))
            dispatch(setPlayerBet({ref: playerTurn, chips: higher}));
            if((higher - players[playersName.indexOf(playerTurn)].bet) == players[playersName.indexOf(playerTurn)].chips){
                dispatch(setAllIn(playerTurn));
            }
            dispatch(moveDone(playerTurn));
        }
    }

    function raise(bet: number){
        const higher = findHigherBet();
        dispatch(removeChips({ref: playerTurn, chips: higher - players[playersName.indexOf(playerTurn)].bet + bet}));
        dispatch(setPlayerBet({ref: playerTurn, chips: higher + bet}));
        dispatch(raiseDone());
        dispatch(setRaiseCalled());

        if(((higher - players[playersName.indexOf(playerTurn)].bet) +  bet) == players[playersName.indexOf(playerTurn)].chips){
            dispatch(setAllIn(playerTurn));
        }
    }

    function allIn(){
        dispatch(removeChips({ref: playerTurn, chips: players[playersName.indexOf(playerTurn)].chips}));
        dispatch(setPlayerBet({ref: playerTurn, chips: players[playersName.indexOf(playerTurn)].chips}));
        dispatch(raiseDone());
        dispatch(setAllIn(playerTurn));
        dispatch(setRaiseCalled());
    }

    function fold(){
        dispatch(outOfManche(playerTurn));
        dispatch(moveDone(playerTurn));
    }

    function check(){
        dispatch(moveDone(playerTurn));
    }

    function setMove(move: Moves, bet?: number){
        const 
            higher = findHigherBet(),
            possibleMoves: Moves[] = [Moves.fold, Moves.allIn],
            playersName = players.map(giocatore => giocatore.name),
            player: player = players[playersName.indexOf(playerTurn)];
        
        if(round == 1){
            if(player.chips >= 5 && player.chips >= higher - player.bet){
                possibleMoves.push(Moves.call);
            }
            if(bet && player.chips >= bet + (higher - player.bet) && bet >= 5){
                possibleMoves.push(Moves.raise);
            }
        } else if(player.bet >= higher){
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
        if(bet && bet == 0){
            delete possibleMoves[possibleMoves.indexOf(Moves.raise)]
        };

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