
import { useEffect, useRef, useState } from 'react';
import './commands.css';
import { useDispatch, useSelector } from 'react-redux';
import { carteCentrali, hideAll, outOfManche, removeChips, resetCards, setCentralCardVisible, setCentralCards, setPlayerCards, showAll, updatePlayersBetting, updatePlayersInManche, win} from '../../state/formPlayer/nPlayerSlice';
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
        playersBetting = useSelector((state: RootState)  => state.giocatori.playersBetting)

    let [style, setStyle] = useState(visible);

    useEffect(()=>{
        if (round == 5) {
            dispatch(showAll());
            setTimeout(()=>{
                assignFish();
                dispatch(updatePlayersInManche());
                dispatch(hideAll());
                dispatch(nextManche());
                dispatch(resetMin());
                newManche();
            }, 2000);
        }
        else if(round != 0) {
            if(playerTurn!=1){
                setStyle(invisible);
                setTimeout(() => {
                    action(playerTurn)
                }, 1000)
            } else {
                setStyle(visible);
            }
            if(round>1 && round<5) {
            dispatch(setCentralCardVisible(round))
            }
        }
    }, [round])

    useEffect(()=>{
        if(turns == 1){
            dispatch(nextRound());
            dispatch(updatePlayersBetting());
         } else if(playersInManche.length == 1) {
            dispatch(showAll());
            setTimeout(()=>{
                assignFish();
                dispatch(updatePlayersInManche());
                dispatch(hideAll());
                dispatch(nextManche());
                dispatch(resetMin());
                newManche();
            }, 2000);
         } else if(playerTurn!=1){
            setStyle(invisible);
            setTimeout(() => {
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
        if(turns >= playersBetting.length){
            dispatch(nextTurn(playersInManche))
        } else {
            dispatch(nextTurn(playersBetting))
        }
    }

    function easy(turnof: number) {
        let bet = minimum;
        dispatch(removeChips({ref: turnof, chips: bet}));
    }

    function medium(turnof: number) {
        let bet = minimum;
        dispatch(removeChips({ref: turnof, chips: bet}));
    }

    function hard(turnof: number) {
        let bet = minimum;
        dispatch(removeChips({ref: turnof, chips: bet}));
    }

    function call(){
        dispatch(removeChips({ref: 1, chips: minimum}));
        dispatch(nextTurn(playersBetting));
    }

    function assignFish(){
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
                dispatch(nextTurn(playersBetting));
            }
        }
    }

    function fold(ref: number){
        dispatch(outOfManche(ref));
        dispatch(nextTurn(playersBetting))
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
                <button onClick={() => fold(1)}>fold</button>
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