import { createSlice } from "@reduxjs/toolkit";

const initialState: number[] = [];

const releaseSlice = createSlice({
    name: "carteUscite",
    initialState,
    reducers: {
        setCards:(_state, action: {payload: number[]}) => {
            return [...action.payload]
        }   
    }
})

export default releaseSlice.reducer;
export const {setCards} = releaseSlice.actions;