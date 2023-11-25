import { createSlice } from "@reduxjs/toolkit";

interface releasedState{
    mazzo: number[],
}

const initialState: releasedState = {
    mazzo: []
}

const releaseSlice = createSlice({
    name: "carteUscite",
    initialState,
    reducers: {
        addCard:(state, action)=>{
            state.mazzo.push(action.payload);
        },
        empty: (state)=>{
            state.mazzo  = [];
        }
    }
})

export default releaseSlice.reducer;
export const {addCard, empty} = releaseSlice.actions;