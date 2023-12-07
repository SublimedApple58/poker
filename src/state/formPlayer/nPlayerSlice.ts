import { createSlice } from "@reduxjs/toolkit";

interface numberPlayer{
    players: any[],
}

const initialState: numberPlayer = {
    players: [],
};

const playerSlice = createSlice({
    name: "numberPlayer",
    initialState,
    reducers: {
        addPlayer: (state, action: {payload: any}) => {
            return Object.assign({}, state, {
                players: [...state.players, action.payload]
            })
        },
    }
})

export default playerSlice.reducer;
export const {addPlayer} = playerSlice.actions;