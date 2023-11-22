import { createSlice } from "@reduxjs/toolkit";

interface numberPlayer{
    nplayer: number
}

const initialState: numberPlayer = {
    nplayer: 0
};

const playerSlice = createSlice({
    name: "numberPlayer",
    initialState,
    reducers: {
        choise: (state, action) => {
            state.nplayer = action.payload;
        }   
    }
})

export default playerSlice.reducer;
export const {choise} = playerSlice.actions;