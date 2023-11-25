import { createSlice } from "@reduxjs/toolkit";

interface releasedState{
    key: number,
    array: number[],
}

const initialState: releasedState = {
    key: 0,
    array: []
}

const releaseSlice = createSlice({
    name: "carteUscite",
    initialState,
    reducers: {
        addCard:(state, action)=>{
            state.array[state.key] = action.payload;
            state.key += 1;
        },
        empty: (state)=>{
            state.array  = [];
        }
    }
})

export default releaseSlice.reducer;
export const {addCard} = releaseSlice.actions;