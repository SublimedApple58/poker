import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextTurn, setRaiseCalled, setStyle } from "../state/gameStatus/gameSlice";
import { updateCopy } from "../state/formPlayer/nPlayerSlice";
import useManche from "./useManche";
import { RootState } from "../state/store";
import useAction from "./useAction";
import useRound from "./useRound";

export default function useTurn(){

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
        endRound = useRound(),
        round = useSelector((state: RootState) => state.game.round),
        turns = useSelector((state: RootState) => state.game.turns),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        players = useSelector((state: RootState)=> state.giocatori.players),
        giocatoriInManche = players.filter(giocatore => giocatore.inManche),
        giocatoriInGame = players.filter(giocatore => giocatore.inGame),
        playersDone = players.map(giocatore => giocatore.done),
        playersCopy = useSelector((state: RootState)=> state.giocatori.playersCopy),
        raiseCalled = useSelector((state: RootState) => state.game.raiseCalled);

    
    let playersDoneCopy = playersCopy.map(giocatore => giocatore.done);

    
    useEffect(()=>{
        const compareArrays = (a: boolean[], b: boolean[]) => {
            return JSON.stringify(a) === JSON.stringify(b);
          };
        if(!compareArrays(playersDone, playersDoneCopy) || raiseCalled){
            if(round >= 1){
                if(raiseCalled){
                    dispatch(setRaiseCalled());
                }
                dispatch(updateCopy());
                dispatch(nextTurn(players));
            }
        }
    }, [playersDone])

    useEffect(()=>{
        if(round == 0){
            dispatch(updateCopy())
        }
        if(giocatoriInGame.length > 1){
            if(giocatoriInManche.length == 1){
                endManche();
             } else if(turns == 1) {
                endRound();
             } else if(playerTurn!=1){
                dispatch(setStyle(invisible));
                setTimeout(() => {
                    action();
                }, 1000);
            } else {
                dispatch(setStyle(visible));
            }
        } else {
            dispatch(setStyle(invisible));
        }
    }, [playerTurn])
}