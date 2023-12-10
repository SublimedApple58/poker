import { createSlice } from "@reduxjs/toolkit";

interface game {
    round: number,
    turn: number,
    lastBet: number,
    playerMove: boolean
}

const initialState: game = {
    round: 1,
    turn: 1,
    lastBet: 5,
    playerMove: false
};

const gameSlice = createSlice({
    name: 'game',
    initialState, 
    reducers: {
        nextRound: (state) => {
            return Object.assign({}, state, {
                round: state.round+1,
                lastBet: 5,
                playerMove: false
            });
        },
        nextTurn: (state, action: {payload: number}) => {
            if(state.turn == action.payload){
                return Object.assign({}, state, {
                    turn: 1,
                    round: state.round + 1
                })
            } else {
                return Object.assign({}, state, {
                    turn: state.turn+1
                })
            }
        },
        updateMin: (state, action: {payload: number}) => {
            return Object.assign({}, state, {
                lastBet: action.payload
            })
        },
        done: (state) => {
            return Object.assign({}, state, {
                playerMove: true
            })
        }
    }
})

export default gameSlice.reducer;
export const { nextRound, updateMin, nextTurn} = gameSlice.actions