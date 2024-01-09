import { createSlice } from "@reduxjs/toolkit";

interface game {
    round: number,
    playerTurn: number,
    turns: number,
    lastBet: number,
    difficulty: string,
    manche: number,
    lastManche: number,
}

interface player{
    name: number,
    chips: number,
    isUser: boolean
    isVisible: boolean,
    side: number,
    carte: number[],
    done: boolean
}

const initialState: game = {
    round: 0, // momentaneo
    playerTurn: 1,
    turns: 1,
    lastBet: 5,
    difficulty: '',
    manche: 1,
    lastManche: 1
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
        nextTurn: (state, action: {payload: {inManche: number[], players: player[]}}) => {
            let allTrue: boolean = true;
            for(let i = 0; i<action.payload.players.length; i++){
                if(action.payload.players[i].name != state.playerTurn){
                    !action.payload.players[i].done ? allTrue = false : allTrue;
                }
                if(!allTrue){break}
            }
            if(allTrue){
                if(state.playerTurn == action.payload.inManche[action.payload.inManche.length-1]){
                    return Object.assign({}, state, {
                        turns: 1,
                        playerTurn:  action.payload.inManche[0]
                    })
                } else {
                    return Object.assign({}, state, {
                        turns: 1,
                        playerTurn:  action.payload.inManche[action.payload.inManche.indexOf(state.playerTurn)+1]
                    })
                }
            } else {
                if(state.playerTurn == action.payload.inManche[action.payload.inManche.length-1]){
                    return Object.assign({}, state, {
                        turns: state.turns+1,
                        playerTurn:  action.payload.inManche[0]
                    })
                } else {
                    return Object.assign({}, state, {
                        turns: state.turns+1,
                        playerTurn:  action.payload.inManche[action.payload.inManche.indexOf(state.playerTurn)+1]
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
export const { nextRound, restartRound, updateMin, resetMin, nextTurn, setTurn, setDifficulty, nextManche} = gameSlice.actions