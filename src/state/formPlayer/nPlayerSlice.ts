import { createSlice } from "@reduxjs/toolkit";


const initialState: any[] = []

const playerSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        addPlayer: (state, action: {payload: any}) => {
            return [...state, action.payload]
        },
    }
})

export default playerSlice.reducer;
export const {addPlayer} = playerSlice.actions;