import { createSlice } from "@reduxjs/toolkit";

interface game {
    round: number
}

const initialState: game = {
    round: 0
};

const gameSlice = createSlice({
    name: 'gameStatus',
    initialState, 
    reducers: {
        nextRound: (state) => {
            const nextRound = state.round+1;
            return Object.assign({}, state, {
                round: nextRound
            });
        }
    }
})

export default gameSlice.reducer;
export const { nextRound } = gameSlice.actions