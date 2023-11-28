import { createSlice } from "@reduxjs/toolkit";

interface releasedState{
    carteUscite: number[],
}

const initialState: releasedState = {
    carteUscite: [],
}

const releaseSlice = createSlice({
    name: "carteUscite",
    initialState,
    reducers: {
        setCards:(state, actions) => {
            state.carteUscite = [...actions.payload]
        }   
    }
})

export default releaseSlice.reducer;
export const {setCards} = releaseSlice.actions;