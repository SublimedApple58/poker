import { createSlice } from "@reduxjs/toolkit"

interface chipsState{
    chips: number
}

const initialState: chipsState ={
    chips: 100
}

const chipsSlice = createSlice({
    name: "chips",
    initialState,
    reducers: {
        addChips: (state, action) =>{
            state.chips += action.payload;
        },
        removeChips: (state, action) =>{
            state.chips -= action.payload;
        },
    }
})

export default chipsSlice.reducer;
export const {addChips, removeChips} = chipsSlice.actions;