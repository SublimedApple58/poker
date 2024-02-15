import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextTurn, setRaiseCalled, setStyle } from "../state/gameStatus/gameSlice";
import { setBluff, updateCopy } from "../state/formPlayer/nPlayerSlice";
import useManche from "./useManche";
import { RootState } from "../state/store";
import useAction from "./useAction";
import useRound from "./useRound";
import { casualNumber } from "../modules/exports";

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
        allInDone: boolean = players.filter(giocatore => giocatore.allIn) == giocatoriInManche,
        giocatoriInGame = players.filter(giocatore => giocatore.inGame),
        playersDone = players.map(giocatore => giocatore.done),
        playersCopy = useSelector((state: RootState)=> state.giocatori.playersCopy),
        raiseCalled = useSelector((state: RootState) => state.game.raiseCalled),
        difficulty = useSelector((state: RootState) => state.game.difficulty);

    
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
            dispatch(updateCopy());
            for(let i = 1; i<=players.length; i++){
                dispatch(setBluff({ref: i, bluff: casualNumber(difficulty) == 1}))
            }
        }
        if(giocatoriInGame.length > 1){
            if(giocatoriInManche.length == 1 || allInDone){
                endManche();
             } else if(turns == 1) {
                endRound();
             } else if(playerTurn!=1){
                dispatch(setStyle(invisible));
                setTimeout(() => {
                    action();
                }, 1500);
            } else {
                dispatch(setStyle(visible));
            }
        } else {
            dispatch(setStyle(invisible));
        }
    }, [playerTurn])
}