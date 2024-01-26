import useMoves from "./useMoves";
import { Moves, indexOfMax, casualNumber, Difficulty } from "../modules/exports";
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

        switch(difficulty) {
            case Difficulty.easy:
                easy(score, casualNumber);
                break;
            case Difficulty.medium:
                medium(score, casualNumber);
                break;
            case Difficulty.hard:
                hard(score, casualNumber);
        }
    }

    function easy(score: number, casualNumber: (par: number) => number) {
        let 
            mossa = Moves.fold,
            bet: number | undefined,
            call: Moves;

        player.bet >= higher ? call = Moves.check : call = Moves.call;

        if(call == Moves.call){
            player.chips < (higher - player.bet) ? call = Moves.fold : call = Moves.call;
        }

        const finished: boolean = player.finished;
            
        if(round==1){
            if(casualNumber(5) == 1){
               mossa = Moves.fold;
            } else {
                if(player.bet >= 5){
                    if(higher - player.bet > player.chips){
                        mossa = Moves.fold;
                    } else {
                        mossa = call;
                    }
                } else {
                    mossa = Moves.call;
                }
            }
        } else {
            switch(true){
                case score <= 14: // nulla
                    if(call == Moves.check){
                        mossa = call;
                    } else {
                        mossa = Moves.fold;
                    }
                    break;
                case score >= 15 && score < 30: // coppia
                    if(higher - player.bet > (player.chips/100*10)){
                        mossa = Moves.fold;
                    } else {
                        mossa = call;
                    }
                    break;
                case score >= 30 && score < 45: // doppia coppia
                    if(higher - player.bet > (player.chips/100*20)){
                        mossa = Moves.fold;
                    } else {
                        mossa = call;
                    }
                    break;
                case score >= 45 && score < 60: // tris
                    if(finished){
                        if(higher - player.bet > (player.chips/100*40)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call;
                        }
                    } else {
                        if((player.chips - (higher - player.bet + 20)) >= (player.chips/100*60)){
                            mossa = Moves.raise;
                            bet = 20;
                        } else {
                            if(higher - player.bet > (player.chips/100*40)){
                                mossa = Moves.fold;
                            } else {
                                mossa = call;
                            }
                        }
                    }
                    break;
                case score >= 60 && score < 120: // scala, colore, full, poker
                    if(finished){
                        if(higher - player.bet > (player.chips/100*50)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call
                        }
                    } else {
                        if((player.chips - (higher - player.bet + 20)) >= (player.chips/100*50)){
                            mossa = Moves.raise;
                            bet = 20;
                        } else {
                            if(higher - player.bet > (player.chips/100*50)){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        }
                    }
                    break;
                case score >= 120:
                    if(finished){
                        mossa = Moves.check
                    } else {
                        mossa = Moves.allIn;
                    }
                    break;
            }
        }
        if(bet){
            setMove(mossa, bet);
        } else {
            setMove(mossa);
        }
    }

    function medium(score: number, casualNumber: (par: number) => number) {
        let 
            mossa = Moves.fold,
            bet: number | undefined,
            call: Moves,
            bluff: boolean = player.bluff;

        player.bet >= higher ? call = Moves.check : call = Moves.call;

        if(call == Moves.call){
            player.chips < (higher - player.bet) ? call = Moves.fold : call = Moves.call;
        }

        const finished: boolean = player.finished;

        if(round==1){
            if(casualNumber(7) == 1){
            mossa = Moves.fold;
            } else {
                if(player.bet >= 5){
                    if(higher - player.bet > player.chips){
                        mossa = Moves.fold;
                    } else {
                        mossa = call;
                    }
                } else {
                    mossa = Moves.call;
                }
            }
        } else {
            switch(true){
                case score <= 14: // nulla
                    if(bluff){
                        if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            mossa = Moves.raise;
                            bet = 10;
                        }
                    } else {
                        if(call == Moves.check){
                            mossa = call;
                        } else {
                            mossa = Moves.fold;
                        }
                    }
                    break;
                case score >= 15 && score < 30: // coppia
                    if(bluff){
                        if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            mossa = Moves.raise;
                            bet = 10;
                        }
                    } else {
                        if(higher - player.bet > (player.chips/100*10)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call;
                        }
                    }
                    break;
                case score >= 30 && score < 45: // doppia coppia
                    if(bluff){
                        if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            mossa = Moves.raise;
                            bet = 20;
                        }
                    } else {
                        if(higher - player.bet > (player.chips/100*20)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call;
                        }
                    }
                    break;
                case score >= 45 && score < 60: // tris
                    if(bluff){
                        if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            mossa = Moves.raise;
                            bet = 30;
                        }
                    } else {
                        if(finished){
                            if(higher - player.bet > (player.chips/100*40)){
                                mossa = Moves.fold;
                            } else {
                                mossa = call;
                            }
                        } else {
                            if((player.chips - (higher - player.bet + 20)) >= (player.chips/100*60)){
                                mossa = Moves.raise;
                                bet = 20;
                            } else {
                                if(higher - player.bet > (player.chips/100*40)){
                                    mossa = Moves.fold;
                                } else {
                                    mossa = call;
                                }
                            }
                        }
                    }
                    break;
                case score >= 60 && score < 120: // scala, colore, full, poker
                    if(finished){
                        if(higher - player.bet > (player.chips/100*50)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call
                        }
                    } else {
                        if((player.chips - (higher - player.bet + 20)) >= (player.chips/100*50)){
                            mossa = Moves.raise;
                            bet = 20;
                        } else {
                            if(higher - player.bet > (player.chips/100*50)){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        }
                    }
                    break;
                case score >= 120: // scala colore, scala reale
                    if(finished){
                        mossa = Moves.check
                    } else {
                        mossa = Moves.allIn;
                    }
                    break;
            }
        }
        if(bet){
            setMove(mossa, bet);
        } else {
            setMove(mossa);
        }
    }

    function hard(score: number, casualNumber: (par: number) => number) {
        let 
            mossa = Moves.fold,
            bet: number | undefined,
            call: Moves,
            bluff: boolean = player.bluff;

        player.bet >= higher ? call = Moves.check : call = Moves.call;

        if(call == Moves.call){
            player.chips < (higher - player.bet) ? call = Moves.fold : call = Moves.call;
        }

        const finished: boolean = player.finished;

        if(round==1){
            if(casualNumber(7) == 1){
            mossa = Moves.fold;
            } else {
                if(player.bet >= 5){
                    if(higher - player.bet > player.chips){
                        mossa = Moves.fold;
                    } else {
                        mossa = call;
                    }
                } else {
                    mossa = Moves.call;
                }
            }
        } else {
            switch(true){
                case score <= 14: // nulla
                    if(bluff){
                        if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            mossa = Moves.raise;
                            bet = 10;
                        }
                    } else {
                        if(call == Moves.check){
                            mossa = call;
                        } else {
                            mossa = Moves.fold;
                        }
                    }
                    break;
                case score >= 15 && score < 30: // coppia
                    if(bluff){
                        if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            mossa = Moves.raise;
                            bet = 10;
                        }
                    } else {
                        if(higher - player.bet > (player.chips/100*10)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call;
                        }
                    }
                    break;
                case score >= 30 && score < 45: // doppia coppia
                    if(bluff){
                        if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            mossa = Moves.raise;
                            bet = 20;
                        }
                    } else {
                        if(higher - player.bet > (player.chips/100*20)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call;
                        }
                    }
                    break;
                case score >= 45 && score < 60: // tris
                    if(bluff){
                        if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            mossa = Moves.raise;
                            bet = 30;
                        }
                    } else {
                        if(finished){
                            if(higher - player.bet > (player.chips/100*40)){
                                mossa = Moves.fold;
                            } else {
                                mossa = call;
                            }
                        } else {
                            if((player.chips - (higher - player.bet + 20)) >= (player.chips/100*60)){
                                mossa = Moves.raise;
                                bet = 20;
                            } else {
                                if(higher - player.bet > (player.chips/100*40)){
                                    mossa = Moves.fold;
                                } else {
                                    mossa = call;
                                }
                            }
                        }
                    }
                    break;
                case score >= 60 && score < 120: // scala, colore, full, poker
                    if(finished){
                        if(higher - player.bet > (player.chips/100*50)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call
                        }
                    } else {
                        if((player.chips - (higher - player.bet + 20)) >= (player.chips/100*50)){
                            mossa = Moves.raise;
                            bet = 20;
                        } else {
                            if(higher - player.bet > (player.chips/100*50)){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        }
                    }
                    break;
                case score >= 120: // scala colore, scala reale
                    if(finished){
                        mossa = Moves.check
                    } else {
                        mossa = Moves.allIn;
                    }
                    break;
            }
        }
        if(bet){
            setMove(mossa, bet);
        } else {
            setMove(mossa);
        }
    }

    return action;
}