
import { useEffect, useRef, useState } from 'react';
import './commands.css';
import { useDispatch, useSelector } from 'react-redux';
import { carteCentrali, hideAll, outOfGame, outOfManche, raiseDone, removeChips, resetAllIn, resetCards, resetDone, resetPlayersBet, setCentralCardVisible, setCentralCards, setPlayerBet, setPlayerCards, showAll, updateCopy, updatePlayersInManche, win} from '../../state/formPlayer/nPlayerSlice';
import { RootState } from '../../state/store';
import { nextManche, nextRound, nextTurn, setRaiseCalled } from '../../state/gameStatus/gameSlice';
import gameHelper, { cardProperties } from '../../helper/gameHelper';
import cardHelper from '../../helper/cardHelper';
import { indexOfMax } from '../../customHooks/useMoves';
import useMoves from '../../customHooks/useMoves';
import useAction from '../../customHooks/useAction';

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
        invisible = {
            opacity: '0'
        },
        visible = {
            opacity: '1'
        },
        dispatch = useDispatch(),
        players = useSelector((state: RootState)=> state.giocatori.players),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        turns = useSelector((state: RootState) => state.game.turns),
        round = useSelector((state: RootState) => state.game.round),
        centralCards = useSelector((state: RootState) => state.giocatori.centralCards),
        giocatoriInManche = players.filter(giocatore => giocatore.inManche),
        giocatoriInGame = players.filter(giocatore => giocatore.inGame),
        playersDone = players.map(giocatore => giocatore.done),
        playersCopy = useSelector((state: RootState)=> state.giocatori.playersCopy),
        raiseCalled = useSelector((state: RootState) => state.game.raiseCalled),
        setMove = useMoves(),
        action = useAction();
    
    let playersDoneCopy = playersCopy.map(giocatore => giocatore.done);

    let [style, setStyle] = useState(visible);

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
        if(giocatoriInGame.length > 1){
            if (round == 5) {
                dispatch(showAll());
                setTimeout(()=>{
                    assignFish();
                    dispatch(hideAll());
                    dispatch(updatePlayersInManche());
                    dispatch(nextManche());
                    dispatch(resetPlayersBet());
                    dispatch(resetDone());
                    dispatch(resetAllIn());
                    newManche();
                }, 2000);
            }
            else if(round != 0) {
                    if(playerTurn!=1){
                        setStyle(invisible);
                        setTimeout(() => {
                            action();
                        }, 1000)
                    } else {
                        setStyle(visible);
                    }
                    if(round>1 && round<5) {
                        dispatch(setCentralCardVisible(round))
                    }
            }
        } else {
            setStyle(invisible);
        }
    }, [round])

    useEffect(()=>{
        if(round == 0){
            dispatch(updateCopy())
        }
        if(giocatoriInGame.length > 1){
            if(giocatoriInManche.length == 1){
                dispatch(showAll());
                setTimeout(()=>{
                    assignFish();
                    dispatch(updatePlayersInManche());
                    dispatch(hideAll());
                    dispatch(nextManche());
                    dispatch(resetPlayersBet());
                    dispatch(resetDone());
                    dispatch(resetAllIn());
                    newManche();
                }, 2000);
             } else if(turns == 1) {
                dispatch(resetPlayersBet());
                dispatch(nextRound());
                dispatch(resetDone());
             } else if(playerTurn!=1){
                setStyle(invisible);
                setTimeout(() => {
                    action()
                }, 1000)
            } else {
                setStyle(visible);
            }
        } else {
            setStyle(invisible);
        }
    }, [playerTurn])

    function assignFish(){

        const 
          numeriGiocatori: any[] = giocatoriInManche.map(giocatore => giocatore.carte), // da fare refactory
          carteGiocatori: any[] = giocatoriInManche.map(giocatore => {  // da fare refactory
            return [
                cardHelper.converNumberToCard(giocatore.carte[0]), 
                cardHelper.converNumberToCard(giocatore.carte[1])
            ]
        }); 

        const punteggi: number[] = [];
        for(let i = 0; i<carteGiocatori.length; i++){
            if(round>1 && round<=4){
                let carteCentraliScoperte: cardProperties[] = [];
                for(let j = 0; j<round+1; j++){
                    carteCentraliScoperte.push(cardHelper.converNumberToCard(centralCards[i].numero))
                }
                punteggi.push(gameHelper.calcScore(carteGiocatori[i], carteCentraliScoperte));
            } else if(round>4){
                let carteCentraliScoperte: cardProperties[] = [];
                for(let j = 0; j<5; j++){
                    carteCentraliScoperte.push(cardHelper.converNumberToCard(centralCards[i].numero))
                }
                punteggi.push(gameHelper.calcScore(carteGiocatori[i], carteCentraliScoperte));
            } else {
                punteggi.push(gameHelper.calcScore(carteGiocatori[i]));
            }    
            
        }

        for(let i = 0; i<giocatoriInManche.length; i++){
            const compareArrays = (a: number[], b: number[]) => {
                return JSON.stringify(a) === JSON.stringify(b);
              };
            if(compareArrays(players[giocatoriInManche[i].name-1].carte, numeriGiocatori[indexOfMax(punteggi)])){
                dispatch(win(players[giocatoriInManche[i].name-1].name));
                // si occupa di cacciare dal gioco chi non ha piu' soldi
                const namesInGame = giocatoriInGame.map(giocatore => giocatore.name)
                for(let j = 0; j<players.length; j++){
                    if(players[j].chips == 0 && namesInGame.includes(players[j].name) && players[j].name != players[giocatoriInManche[i].name-1].name){
                        dispatch(outOfManche(players[j].name));
                        dispatch(outOfGame(players[j].name));
                    }
                }
            }
        }
    }

    function newManche(){
        // creare nuova manche, azzerando carte e ricoprendole tutte quante
        dispatch(resetCards());
        const carte = cardHelper.generateCasualCard(giocatoriInManche.length);
        let contatore = 0;
        for(let i = 0; i<=giocatoriInManche.length; i++){            
            dispatch(setPlayerCards({index: i, carte: [carte[contatore], carte[contatore+1]]}))
            contatore+=2;
        }
        const carteConvertiteCentrali: carteCentrali[] = carte.slice(contatore-2).map(carta => {
            return {
              numero: carta,
              isVisible: false
            }
          });
        dispatch(setCentralCards(carteConvertiteCentrali));
    }

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