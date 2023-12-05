import { createSlice } from "@reduxjs/toolkit";

interface numberPlayer{
    nplayer: number,
    players: any[],
}

const initialState: numberPlayer = {
    nplayer: 0,
    players: [],
};

const playerSlice = createSlice({
    name: "numberPlayer",
    initialState,
    reducers: {
        choise: (state, action: {payload: number}) => {
            return Object.assign({}, state, {
                nplayer: action.payload,
            })
        },
        addPlayer: (state, action: {payload: any}) => {
            return Object.assign({}, state, {
                players: [...state.players, action.payload]
            })
        },
    }
})

export default playerSlice.reducer;
export const {choise, addPlayer} = playerSlice.actions;