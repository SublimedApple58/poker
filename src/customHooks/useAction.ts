import useMoves from "./useMoves";
import { Moves, indexOfMax } from "../modules/exports";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import gameHelper, {cardProperties} from "../helper/gameHelper";
import cardHelper from "../helper/cardHelper";
import { player } from "../modules/exports";
import difficultyHelper from "../helper/difficultyHelper";

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
    
    
    let call: Moves = Moves.fold;
    player.bet >= higher ? call = Moves.check : call = Moves.call;

    if(call == Moves.call){
        player.chips <= (higher - player.bet) ? call = Moves.fold : call = Moves.call;
    }

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
            visibleCards = numeri.slice(round);
            score = gameHelper.calcScore(playersCards, visibleCards);
          } else if(round>4){
            visibleCards = [...numeri];
            score = gameHelper.calcScore(playersCards, visibleCards);
          } else {
            score = gameHelper.calcScore(playersCards);
          }

        const { mossa, bet } = difficultyHelper.chooseAMove(difficulty, round, player, higher, score);
        if(bet){
            setMove(mossa, bet);
        } else {
            setMove(mossa);
        }
    }

    return action;
}