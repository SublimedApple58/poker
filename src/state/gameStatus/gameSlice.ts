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
        nextTurn: (state, action: {payload: number[]}) => {
            if(state.playerTurn >= action.payload[action.payload.length-1]){
                if(state.turns >= action.payload.length){
                    return Object.assign({}, state, {
                        turns: 1,
                        playerTurn: action.payload[0]
                    })
                } else {
                    return Object.assign({}, state, {
                        turns: state.turns + 1,
                        playerTurn: action.payload[0]
                    })
                }
            } else {
                if(state.turns >= action.payload.length){
                    return Object.assign({}, state, {
                        turns: 1,
                        playerTurn: action.payload[action.payload.indexOf(state.playerTurn)+1]
                    })
                } else {
                    return Object.assign({}, state, {
                        turns: state.turns + 1,
                        playerTurn: action.payload[action.payload.indexOf(state.playerTurn)+1]
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