import { createSlice } from "@reduxjs/toolkit";

interface releasedState{
    key: number,
    carteUscite: [
        {}
    ],
}

const initialState: releasedState = {
    key: 0,
    carteUscite: [{}]
}

const releaseSlice = createSlice({
    name: "carteUscite",
    initialState,
    reducers: {
        addCard:(state, action)=>{
            state.carteUscite[state.key] = action.payload;
            state.key += 1;
        },
        empty: (state)=>{
            state.carteUscite = [{}];
        }
    }
})

export default releaseSlice.reducer;
export const {addCard} = releaseSlice.actions;