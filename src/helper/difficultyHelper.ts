
    // STILL WORKING ON THIS

import { Difficulty, player, Moves, casualNumber } from "../modules/exports";

class difficultyHelper{
    static chooseAMove(difficulty: Difficulty, round: number, player: player, higher: number, score: number){

        function tryRaise(bet: number, chipsToKeep: number) : {mossa: Moves, bet: number | undefined}{
            let 
                mossa: Moves = Moves.fold,
                money: number | undefined = 0;
    
            if((player.chips - (higher - player.bet + bet)) >= (player.chips/100*chipsToKeep)){
                mossa = Moves.raise;
                money = bet;
                return {mossa: mossa, bet: money};
            } else {
                mossa = call;
                money = undefined;
                return {mossa: mossa, bet: money};
            }
        }

        let call: Moves = Moves.fold;
        player.bet >= higher ? call = Moves.check : call = Moves.call;
    
        if(call == Moves.call){
            player.chips <= (higher - player.bet) ? call = Moves.fold : call = Moves.call;
        }

        let 
            mossa: Moves = call,
            bet: number | undefined,
            bluff: boolean = player.bluff;

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
                    switch(difficulty){
                        case Difficulty.easy:
                            if(higher - player.bet > player.chips/100*40){
                                mossa = Moves.fold;
                            } else {
                                mossa = Moves.call;
                            }
                            break;
                        default: 
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = Moves.call;
                            }
                            break;
                    }
                }
            }
        } else {
            switch(true){
                case score <= 14: // nulla
                    if(bluff && (difficulty == Difficulty.medium || difficulty == Difficulty.hard)){
                        if(difficulty == Difficulty.hard){
                            if(casualNumber(14) == 1){
                                if(finished){
                                    mossa = Moves.check
                                } else {
                                    mossa = Moves.allIn;
                                }
                            } else {
                                if(finished){
                                    if(higher - player.bet > player.chips){
                                        mossa = Moves.fold;
                                    } else {
                                        mossa = call
                                    }
                                } else {
                                    ({ mossa, bet } = tryRaise(20, 60));
                                    if(mossa == Moves.call && player.chips - (higher - player.bet) < player.chips/100*60){
                                        mossa = Moves.fold;
                                    }
                                }
                            }
                        } else if(finished){
                            if(player.chips - (higher - player.bet) < player.chips/100*70){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            ({ mossa, bet } = tryRaise(10, 70));
                            if(mossa == Moves.call && player.chips - (higher - player.bet) < player.chips/100*70){
                                mossa = Moves.fold;
                            }
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
                    if(bluff && (difficulty == Difficulty.medium || difficulty == Difficulty.hard)){
                        if(difficulty == Difficulty.hard){
                            if(finished){
                                if(higher - player.bet > player.chips){
                                    mossa = Moves.fold;
                                } else {
                                    mossa = call
                                }
                            } else {
                                ({ mossa, bet } = tryRaise(30, 60));
                                if(mossa == Moves.call && player.chips - (higher - player.bet) < player.chips/100*60){
                                    mossa = Moves.fold;
                                }
                            }
                        } else if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            ({ mossa, bet } = tryRaise(10, 70));
                                if(mossa == Moves.call && player.chips - (higher - player.bet) < player.chips/100*60){
                                    mossa = Moves.fold;
                                }
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
                    if(bluff && (difficulty == Difficulty.medium || difficulty == Difficulty.hard)){
                        if(difficulty == Difficulty.hard){
                            if(finished){
                                if(higher - player.bet > player.chips){
                                    mossa = Moves.fold;
                                } else {
                                    mossa = call
                                }
                            } else {
                                ({ mossa, bet } = tryRaise(20, 60));
                                if(mossa == Moves.call && player.chips - (higher - player.bet) < player.chips/100*60){
                                    mossa = Moves.fold;
                                }
                            }
                        } else if(finished){
                            if(higher - player.bet > player.chips){
                                mossa = Moves.fold;
                            } else {
                                mossa = call
                            }
                        } else {
                            ({ mossa, bet } = tryRaise(20, 60));
                            if(mossa == Moves.call && player.chips - (higher - player.bet) < player.chips/100*60){
                                mossa = Moves.fold;
                            }
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
                    if(finished){
                        if(higher - player.bet > (player.chips/100*40)){
                            mossa = Moves.fold;
                        } else {
                            mossa = call;
                        }
                    } else {
                        ({ mossa, bet } = tryRaise(20, 60));
                        if(mossa == Moves.call && player.chips - (higher - player.bet) < player.chips/100*60){
                            mossa = Moves.fold;
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
                        if(difficulty == Difficulty.hard || difficulty == Difficulty.medium){
                            if(finished){
                                mossa = Moves.check;
                            } else {
                                mossa = Moves.allIn;
                            }
                        } else {
                            ({ mossa, bet } = tryRaise(20, 50));
                            if(mossa == Moves.call && player.chips - (higher - player.bet) < player.chips/100*50){
                                mossa = Moves.fold;
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
        return { mossa, bet}
    }
}

export default difficultyHelper;