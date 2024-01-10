
import { useEffect, useRef, useState } from 'react';
import './commands.css';
import { useDispatch, useSelector } from 'react-redux';
import { carteCentrali, hideAll, moveDone, outOfGame, outOfManche, raiseDone, removeChips, resetCards, resetDone, setCentralCardVisible, setCentralCards, setPlayerBet, setPlayerCards, showAll, updatePlayersBetting, updatePlayersInManche, win} from '../../state/formPlayer/nPlayerSlice';
import { RootState } from '../../state/store';
import { nextManche, nextRound, nextTurn, resetMin, updateMin } from '../../state/gameStatus/gameSlice';
import gameHelper, { cardProperties } from '../../helper/gameHelper';
import cardHelper from '../../helper/cardHelper';

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
        players = useSelector((state: RootState)=> state.giocatori.players),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        difficulty = useSelector((state: RootState) => state.game.difficulty),
        turns = useSelector((state: RootState) => state.game.turns),
        round = useSelector((state: RootState) => state.game.round),
        centralCards = useSelector((state: RootState) => state.giocatori.centralCards),
        playersInManche = useSelector((state: RootState) => state.giocatori.playersInManche),
        playersInGame = useSelector((state: RootState) => state.giocatori.playersInGame),
        playersBetting = useSelector((state: RootState)  => state.giocatori.playersBetting)

    let [style, setStyle] = useState(visible);

    function indexOfMax(arr: number[]) {
        
        let max = arr[0];
        let maxIndex = 0;
    
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }

    useEffect(()=>{
        if (round == 5) {
            dispatch(showAll());
            setTimeout(()=>{
                assignFish();
                dispatch(updatePlayersInManche());
                dispatch(updatePlayersBetting());
                dispatch(hideAll());
                dispatch(nextManche());
                dispatch(resetMin());
                newManche();
            }, 2000);
        }
        else if(round != 0) {
            if(playersInGame.length > 1){
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
        }
    }, [round])

    useEffect(()=>{
        if(playersInManche.length == 1){
            dispatch(showAll());
            setTimeout(()=>{
                assignFish();
                dispatch(updatePlayersInManche());
                dispatch(updatePlayersBetting());
                dispatch(hideAll());
                dispatch(nextManche());
                dispatch(resetMin());
                newManche();
            }, 2000);
         } else if(turns == 1) {
            if(round == 1){
                dispatch(updateMin(0))
            }
            dispatch(nextRound());
            dispatch(updatePlayersBetting());
            dispatch(resetDone())
         } else if(playerTurn!=1){
            setStyle(invisible);
            setTimeout(() => {
                action()
            }, 1000)
        } else {
            setStyle(visible);
        }
    }, [playerTurn])

    function action(){
        switch(difficulty) {
            case 'easy':
                easy();
                break;
            case 'medium':
                medium();
                break;
            case 'hard':
                hard();
        }
    }

    function easy() {
        if(minimum != 0){
            let bet = minimum;
            dispatch(removeChips({ref: playerTurn, chips: bet}));
            dispatch(setPlayerBet({ref: playerTurn, chips: bet}));
            dispatch(moveDone(playerTurn))
            if(turns >= playersBetting.length){
                dispatch(nextTurn({inManche: playersInManche, players: players}))
            } else {
                dispatch(nextTurn({inManche: playersBetting, players: players}))
            }
        } else {
            call();
        }
    }

    function medium() {
        if(minimum != 0){
            let bet = minimum;
            dispatch(removeChips({ref: playerTurn, chips: bet}));
            dispatch(setPlayerBet({ref: playerTurn, chips: bet}));
            if(turns >= playersBetting.length){
                dispatch(nextTurn({inManche: playersInManche, players: players}))
            } else {
                dispatch(nextTurn({inManche: playersBetting, players: players}))
            }
        } else {
            call();
        }
    }

    function hard() {
        if(minimum != 0){
            let bet = minimum;
            dispatch(removeChips({ref: playerTurn, chips: bet}));
            dispatch(setPlayerBet({ref: playerTurn, chips: bet}));
            if(turns >= playersBetting.length){
                dispatch(nextTurn({inManche: playersInManche, players: players}))
            } else {
                dispatch(nextTurn({inManche: playersBetting, players: players}))
            }
        } else {
            call();
        }
    }

    function assignFish(){

        const numeriGiocatori: any[] = []; // da fare refactory
        for(let i = 0; i<playersInManche.length; i++){
            numeriGiocatori.push([players[playersInManche[i]-1].carte[0], players[playersInManche[i]-1].carte[1]])
        }

        const carteGiocatori: any[] = []  // da fare refactory
        for(let i = 0; i<playersInManche.length; i++){
            carteGiocatori.push([cardHelper.converNumberToCard(players[playersInManche[i]-1].carte[0]), cardHelper.converNumberToCard(players[playersInManche[i]-1].carte[1])]);
        }

        const punteggi: number[] = [];
        for(let i = 0; i<carteGiocatori.length; i++){
            if(round>1 && round<4){
                let carteCentraliScoperte: cardProperties[] = [];
                for(let i = 0; i<round+1; i++){
                    carteCentraliScoperte.push(cardHelper.converNumberToCard(centralCards[i].numero))
                }
                punteggi.push(gameHelper.calcScore(carteGiocatori[i], carteCentraliScoperte));
            } else if(round>4){
                let carteCentraliScoperte: cardProperties[] = [];
                for(let i = 0; i<5; i++){
                    carteCentraliScoperte.push(cardHelper.converNumberToCard(centralCards[i].numero))
                }
                punteggi.push(gameHelper.calcScore(carteGiocatori[i], carteCentraliScoperte));
            } else {
                punteggi.push(gameHelper.calcScore(carteGiocatori[i]));
            }    
            
        }

        for(let i = 0; i<playersInManche.length; i++){
            const compareArrays = (a: number[], b: number[]) => {
                return JSON.stringify(a) === JSON.stringify(b);
              };
            if(compareArrays(players[playersInManche[i]-1].carte, numeriGiocatori[indexOfMax(punteggi)])){
                dispatch(win(players[playersInManche[i]-1].name));
                // si occupa di cacciare dal gioco chi non ha piu' soldi
                for(let j = 0; j<players.length; j++){
                    if(players[j].chips == 0 && playersInGame.includes(players[j].name) && players[j].name != players[playersInManche[i]-1].name){
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
        const carte = cardHelper.generateCasualCard(playersInManche.length);
        let contatore = 0;
        for(let i = 0; i<=playersInManche.length; i++){            
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

    function call(){
        if(round == 1){
            dispatch(removeChips({ref: playerTurn, chips: minimum}));
            dispatch(setPlayerBet({ref: playerTurn, chips: minimum}));
        } else {
            const playersName = players.map(giocatore => giocatore.name);
            dispatch(removeChips({ref: playerTurn, chips: findHigherBet() - players[playersName.indexOf(playerTurn)].bet}))
            dispatch(setPlayerBet({ref: playerTurn, chips: findHigherBet() - players[playersName.indexOf(playerTurn)].bet}));
        }
        dispatch(moveDone(playerTurn));
        if(turns >= playersBetting.length){
            dispatch(nextTurn({inManche: playersInManche, players: players}))
        } else {
            dispatch(nextTurn({inManche: playersBetting, players: players}))
        }
    }

    function raising(){
        if(round==1){
            alert("At first round you can only call or fold")
        } else {
            if(Number.isNaN((amountInput.current?.valueAsNumber ?? 0)) && amountInput.current != null){
                amountInput.current.value = '0';
            } else {
                const playersName = players.map(giocatore => giocatore.name);
                if((amountInput.current?.valueAsNumber ?? 0)>players[playersName.indexOf(playerTurn)].chips){
                    alert(`hey!! You don't have that much money`)
                } else if(amountInput.current != null){
                    dispatch(removeChips({ref: playerTurn, chips: findHigherBet() - players[playersName.indexOf(playerTurn)].bet + (amountInput.current?.valueAsNumber ?? 0)}));
                    dispatch(setPlayerBet({ref: playerTurn, chips: findHigherBet() - players[playersName.indexOf(playerTurn)].bet + (amountInput.current?.valueAsNumber ?? 0)}));
                    amountInput.current.value = '0';
                    dispatch(raiseDone(playerTurn));
                    if(turns >= playersBetting.length){
                        dispatch(nextTurn({inManche: playersInManche, players: players}))
                    } else {
                        dispatch(nextTurn({inManche: playersBetting, players: players}))
                    }
                }
            }
        }
    }

    function raise(bet: number){
        const playersName = players.map(giocatore => giocatore.name);
        dispatch(removeChips({ref: playerTurn, chips: findHigherBet() - players[playersName.indexOf(playerTurn)].bet + bet}));
        dispatch(setPlayerBet({ref: playerTurn, chips: findHigherBet() - players[playersName.indexOf(playerTurn)].bet + bet}));

        dispatch(raiseDone(playerTurn));

        if(turns >= playersBetting.length){
            dispatch(nextTurn({inManche: playersInManche, players: players}))
        } else {
            dispatch(nextTurn({inManche: playersBetting, players: players}))
        }
    }

    function fold(){
        dispatch(moveDone(playerTurn));
        dispatch(outOfManche(playerTurn));
        if(turns >= playersBetting.length){
            dispatch(nextTurn({inManche: playersInManche, players: players}))
        } else {
            dispatch(nextTurn({inManche: playersBetting, players: players}))
        }
    }

    function check(){
        const playersName = players.map(giocatore => giocatore.name);
        if(minimum == 0 && findHigherBet() - players[playersName.indexOf(playerTurn)].bet == 0){
            dispatch(moveDone(playerTurn));
            if(turns >= playersBetting.length){
                dispatch(nextTurn({inManche: playersInManche, players: players}))
            } else {
                dispatch(nextTurn({inManche: playersBetting, players: players}))
            }
        } else {
            alert("you can't check if there's a minimum bet required to keep playing");
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
                <button onClick={() => azione(fold)}>fold</button>
                <button onClick={() => azione(check)}>check</button>
                <button onClick={() => azione(call)}>call</button>
                <button onClick={() => azione(raising)}>raise</button>
            </div>
            <div className="amount" style={style} >
                <input type="number" placeholder='Insert amount' ref={amountInput}/>
            </div>
        </>
    )
}

export default Commands;