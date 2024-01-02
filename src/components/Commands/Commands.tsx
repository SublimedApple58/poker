import { useEffect, useRef, useState } from 'react';
import './commands.css';
import { useDispatch, useSelector } from 'react-redux';
import { carteCentrali, removeChips, resetCards, setCentralCardVisible, setCentralCards, setPlayerCards, showAll, win} from '../../state/formPlayer/nPlayerSlice';
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
        nPlayers = useSelector((state: RootState)=> state.giocatori.players.length), // bug orrendo
        players = useSelector((state: RootState)=> state.giocatori.players),
        playerTurn = useSelector((state: RootState)=> state.game.playerTurn),
        difficulty = useSelector((state: RootState) => state.game.difficulty),
        turns = useSelector((state: RootState) => state.game.turns),
        round = useSelector((state: RootState) => state.game.round),
        centralCards = useSelector((state: RootState) => state.giocatori.centralCards)

    let [style, setStyle] = useState(visible);

    useEffect(()=>{
        if (round == 5) {
            assignFish();
            dispatch(nextManche());
            dispatch(resetMin());
            // dispatch(showAll());
            newManche();
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
            dispatch(nextRound())       
         }
        else if(playerTurn!=1){
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
        dispatch(nextTurn(nPlayers))
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
        dispatch(nextTurn(nPlayers));
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
        for(let i = 0; i<nPlayers; i++){
            numeriGiocatori.push([players[i].carte[0], players[i].carte[1]])
        }

        const carteGiocatori: any[] = []  // da fare refactory
        for(let i = 0; i<nPlayers; i++){
            carteGiocatori.push([cardHelper.converNumberToCard(players[i].carte[0]), cardHelper.converNumberToCard(players[i].carte[1])]);
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

        for(let i = 0; i<nPlayers; i++){
            const compareArrays = (a: number[], b: number[]) => {
                return JSON.stringify(a) === JSON.stringify(b);
              };
            if(compareArrays(players[i].carte, numeriGiocatori[indexOfMax(punteggi)])){
                dispatch(win(players[i].name));
            }
        }
    }

    function newManche(){
        // creare nuova manche, azzerando carte e ricoprendole tutte quante
        // dispatch(showAll())
        dispatch(resetCards());
        const carte = cardHelper.generateCasualCard(nPlayers);
        let contatore = 0;
        for(let i = 0; i<=nPlayers; i++){            
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
                dispatch(nextTurn(nPlayers));
            }
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
                <button>fold</button>
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