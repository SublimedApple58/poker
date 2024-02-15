import { useDispatch, useSelector } from "react-redux";
import { resetDone, resetPlayersBet, setCentralCardVisible } from "../state/formPlayer/nPlayerSlice";
import { nextRound, setStyle } from "../state/gameStatus/gameSlice";
import { useEffect } from "react";
import { RootState } from "../state/store";
import useManche from "./useManche";
import useAction from "./useAction";

export default function useRound(){

    const 
        invisible = {
            opacity: '0'
        },
        visible = {
            opacity: '1'
        },
        dispatch = useDispatch(),
        endManche = useManche(),
        action = useAction(),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        round = useSelector((state: RootState) => state.game.round),
        players = useSelector((state: RootState)=> state.giocatori.players),
        giocatoriInGame = players.filter(giocatore => giocatore.inGame);
        // allInDone: boolean = players.filter(giocatore => giocatore.allIn) == giocatoriInGame.filter(giocatore => giocatore.inManche);

    useEffect(()=>{
        if(giocatoriInGame.length > 1){
            if (round == 5) {
                endManche();
            } else if(round != 0) {
                if(playerTurn!=1){
                    dispatch(setStyle(invisible));
                    setTimeout(() => {
                        action();
                    }, 1500);
                } else {
                    dispatch(setStyle(visible));
                }
                if(round>1 && round<5) {
                    dispatch(setCentralCardVisible(round))
                }
            }
        } else {
            dispatch(setStyle(invisible));
        }
    }, [round])

    function newRound(){
        dispatch(resetPlayersBet());
        dispatch(nextRound());
        dispatch(resetDone());
    }

    return newRound;
    
}