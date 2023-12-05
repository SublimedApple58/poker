import { createSlice } from "@reduxjs/toolkit";

const initialState: number[] = [];

const releaseSlice = createSlice({
    name: "carteUscite",
    initialState,
    reducers: {
        setCards:(_state, actions) => {
            return [...actions.payload]
        }   
    }
})

export default releaseSlice.reducer;
export const {setCards} = releaseSlice.actions;