import { createSlice } from "@reduxjs/toolkit";

interface game {
    round: number,
    playerTurn: number,
    turns: number,
    difficulty: string,
    manche: number,
    finished: boolean,
    raiseCalled: boolean,
}

interface player{
    name: number,
    chips: number,
    isUser: boolean
    isVisible: boolean,
    side: number,
    carte: number[],
    done: boolean,
    bet: number,
    inManche: boolean,
    inGame: boolean
}

const initialState: game = {
    round: 0, // momentaneo
    playerTurn: 1,
    turns: 1,
    difficulty: '',
    manche: 1,
    finished: false,
    raiseCalled: false
};

const gameSlice = createSlice({
    name: 'game',
    initialState, 
    reducers: {
        setTurn: (state, action: {payload: number}) =>{
            return Object.assign({}, state, {
                playerTurn: action.payload
            })
        },
        setRaiseCalled: (state) => {
            return Object.assign({}, state, {raiseCalled: !state.raiseCalled});
        },
        nextRound: (state) => {
            return Object.assign({}, state, {
                round: state.round+1
            });
        },
        restartRound: (state) => {
            return Object.assign({}, state, {
                round: 1
            })
        },
        nextTurn: (state, action: {payload: player[]}) => {
            let allTrue: boolean = true;
            const players: player[] = action.payload;
            for(let i = 0; i<players.length; i++){
                !players[i].done ? allTrue = false : allTrue;
            }

            let lastPlayerInManche = 0;
            for(let i = 0; i<players.length; i++){
                if(players[i].inManche){
                    lastPlayerInManche = i+1;
                }
            }

            if(allTrue){
                let nextOne: number = 0;
                if(state.playerTurn == lastPlayerInManche){
                    for(let i = 0; i<players.length; i++){
                        if(state.round == 5){
                            if(players[i].inGame){
                                nextOne = i;
                                break;
                            }
                        } else {
                            if(players[i].inManche){
                                nextOne = i;
                                break;
                            }
                        }
                    }
                    return Object.assign({}, state, {
                        turns: 1,
                        playerTurn: nextOne + 1
                    })
                } else {
                    for(let i = state.playerTurn; i<players.length; i++){
                        if(state.round == 5){
                            if(players[i].inGame){
                                nextOne = i;
                                break;
                            }
                        } else {
                            if(players[i].inManche){
                                nextOne = i;
                                break;
                            }
                        }
                    }
                    return Object.assign({}, state, {
                        turns: 1,
                        playerTurn: nextOne + 1
                    })
                }
            } else {
                let nextOne: number = 0;
                if(state.playerTurn == lastPlayerInManche){
                    for(let i = 0; i<players.length; i++){
                        if(!players[i].done){
                            nextOne = i;
                            break;
                        }
                    }
                    return Object.assign({}, state, {
                        turns: state.turns + 1,
                        playerTurn: nextOne + 1
                    })
                } else {
                    for(let i = state.playerTurn; i<players.length; i++){
                        if(!players[i].done){
                            nextOne = i;
                            break;
                        }
                    }
                    return Object.assign({}, state, {
                        turns: state.turns + 1,
                        playerTurn: nextOne + 1
                    })
                } 
            }
        },
        nextManche: (state) => {
            return Object.assign({}, state, {
                manche: state.manche + 1,
                round: 1
            })
        },
        updateMin: (state, action: {payload: number}) => {
            return Object.assign({}, state, {
                lastBet: action.payload
            })
        },
        resetMin: (state) =>{
            return Object.assign({}, state, {
                lastBet: 5,
            })
        },
        setDifficulty: (state, action: {payload: string}) => {
            return Object.assign({}, state, {
                difficulty: action.payload
            })
        }
    }
})

export default gameSlice.reducer;
export const { nextRound, restartRound, updateMin, resetMin, nextTurn, setTurn, setRaiseCalled, setDifficulty, nextManche} = gameSlice.actions