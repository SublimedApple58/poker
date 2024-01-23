import useMoves from "./useMoves";
import { Moves, indexOfMax } from "../modules/exports";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import gameHelper, {cardProperties} from "../helper/gameHelper";
import cardHelper from "../helper/cardHelper";
import { player } from "../modules/exports";

export default function useAction(){

    const 
        setMove = useMoves(),
        round = useSelector((state: RootState) => state.game.round),
        players = useSelector((state: RootState) => state.giocatori.players),
        centralCards = useSelector((state: RootState) => state.giocatori.centralCards),
        difficulty = useSelector((state: RootState) => state.game.difficulty),
        playerTurn = useSelector((state: RootState) => state.game.playerTurn),
        playersName = players.map(giocatore => giocatore.name),
        player: player = players[playersName.indexOf(playerTurn)],
        higher = findHigherBet();

    function findHigherBet(){
        const scommesse: number[] = players.map(giocatore => giocatore.bet);
        const maxBet: number = players[indexOfMax(scommesse)].bet;
        return maxBet;
    }


    function action(){
        const 
          playersNames: number[] = players.map(giocatore => giocatore.name),
          playersCards: cardProperties[] = [cardHelper.converNumberToCard(players[playersNames.indexOf(playerTurn)].carte[0]), cardHelper.converNumberToCard(players[playersNames.indexOf(playerTurn)].carte[1])],
          numeri = centralCards.map(carta => cardHelper.converNumberToCard(carta.numero));
        
        let 
          score: number = 0,
          visibleCards: cardProperties[] = [];

          if(round>1 && round<=4){
            visibleCards = numeri.filter((carta, i) => i<=round);
            score = gameHelper.calcScore(playersCards, visibleCards);
          } else if(round>4){
            visibleCards = [...numeri];
            score = gameHelper.calcScore(playersCards, visibleCards);
          } else {
            score = gameHelper.calcScore(playersCards);
          }

        function casualNumber(number: number): number{
            let x = Math.floor(Math.random() * number) + 1;
            return x;
        }

        switch(difficulty) {
            case 'easy':
                easy(score, casualNumber);
                break;
            case 'medium':
                medium();
                break;
            case 'hard':
                hard();
        }
    }

    function easy(score: number, casualNumber: (par: number) => number) {
        // let totalToBet: number = 0;
        if(round==1){
            if(casualNumber(5) == 1){
               setMove(Moves.fold);
            } else {
                setMove(Moves.call);
            }
        } else {
            switch(score){
                case 0:
                    setMove(Moves.fold);
                    break;
                case 1:
                    setMove(Moves.call);
                    break;
                case 2:
                    setMove(Moves.call);
                    break;
                case 3:
                    setMove(Moves.raise, 10);
                    break;
                case 4:
                    setMove(Moves.raise, 10);
                    break;
                case 5:
                    setMove(Moves.raise, 10);
                    break;
                case 6:
                    setMove(Moves.raise, 10);
                    break;
                case 7:
                    setMove(Moves.raise, 10);
                    break;
                case 8:
                    setMove(Moves.raise, 10);
                    break;
                case 9:
                    setMove(Moves.allIn);
                    break;
            }
        }
    }

    function medium() {
        const playersName = players.map(giocatore => giocatore.name);
        if(round == 1){
            setMove(Moves.call);
        } else if(players[playersName.indexOf(playerTurn)].allIn){
            setMove(Moves.check);
        } else if((round == 2 && playerTurn == 2) || (round == 3 && playerTurn == 3)){
            setMove(Moves.raise, 10);
        } else {
            setMove(Moves.call);
        }
    }

    function hard() {
        let mossa;
        if(round == 1){
            mossa = Moves.call
        } else if(player.bet >= higher){
            mossa = Moves.check
        } else {
            mossa = Moves.call
        }
        setMove(mossa);
    }

    return action;
}