import { createSlice } from "@reduxjs/toolkit";

interface game {
    round: number,
    playerTurn: number,
    turns: number,
    lastBet: number,
    difficulty: string,
    manche: number
}

const initialState: game = {
    round: 1,
    playerTurn: 1,
    turns: 1,
    lastBet: 5,
    difficulty: '',
    manche: 1
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
                round: state.round+1,
                lastBet: 5,
            });
        },
        nextTurn: (state, action: {payload: number}) => {
            if(state.playerTurn >= action.payload){
                if(state.turns >= action.payload){
                    return Object.assign({}, state, {
                        turns: 1,
                        playerTurn: 1
                    })
                } else {
                    return Object.assign({}, state, {
                        turns: state.turns + 1,
                        playerTurn: 1
                    })
                }
            } else {
                if(state.turns >= action.payload){
                    return Object.assign({}, state, {
                        turns: 1,
                        playerTurn: state.playerTurn+1
                    })
                } else {
                    return Object.assign({}, state, {
                        turns: state.turns + 1,
                        playerTurn: state.playerTurn+1
                    })
                }
            }
        },
        updateMin: (state, action: {payload: number}) => {
            return Object.assign({}, state, {
                lastBet: action.payload
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
export const { nextRound, updateMin, nextTurn, setTurn, setDifficulty} = gameSlice.actions