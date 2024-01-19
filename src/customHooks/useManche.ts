import { useDispatch, useSelector } from "react-redux";
import cardHelper from "../helper/cardHelper";
import gameHelper, {cardProperties} from "../helper/gameHelper";
import { hideAll, outOfGame, outOfManche, resetAllIn, resetCards, resetDone, resetPlayersBet, setCentralCards, setPlayerCards, showAll, updatePlayersInManche, win } from "../state/formPlayer/nPlayerSlice";
import { RootState } from "../state/store";
import { indexOfMax, carteCentrali } from "../modules/exports";
import { nextManche } from "../state/gameStatus/gameSlice";

export default function useManche(){

    const 
    dispatch = useDispatch(),
    centralCards = useSelector((state: RootState) => state.giocatori.centralCards),
    round = useSelector((state: RootState) => state.game.round),
    players = useSelector((state: RootState) => state.giocatori.players),
    giocatoriInManche = players.filter(giocatore => giocatore.inManche),
    giocatoriInGame = players.filter(giocatore => giocatore.inGame);

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
                    carteCentraliScoperte.push(cardHelper.converNumberToCard(centralCards[j].numero))
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

    function resetTable(){
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

    function newManche(){
        dispatch(showAll());
        setTimeout(()=>{
            assignFish();
            dispatch(updatePlayersInManche());
            dispatch(hideAll());
            dispatch(nextManche());
            dispatch(resetPlayersBet());
            dispatch(resetDone());
            dispatch(resetAllIn());
            resetTable();
        }, 2000)
    }

    return newManche;
}