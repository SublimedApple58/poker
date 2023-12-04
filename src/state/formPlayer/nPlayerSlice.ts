import { createSlice } from "@reduxjs/toolkit";

interface numberPlayer{
    nplayer: number,
    players: any[],
}

const initialState: numberPlayer = {
    nplayer: 0,
    players: []
};

const playerSlice = createSlice({
    name: "numberPlayer",
    initialState,
    reducers: {
        choise: (state, action: {payload: number}) => {
            state.nplayer = action.payload;
        },
        addPlayer: (state, action: {payload: any}) => {
            state.players.push(action.payload);
        }
    }
})

export default playerSlice.reducer;
export const {choise} = playerSlice.actions;