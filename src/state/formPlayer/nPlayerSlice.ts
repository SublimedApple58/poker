import { createSlice } from "@reduxjs/toolkit";


const initialState: any[] = []

interface chips{
    ref: number,
    chips: number
}

const playerSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        addPlayer: (state, action: {payload: any}) => {
            return [...state, action.payload]
        },
        addChips: (state, action: {payload: chips}) => {
            return state.map(giocatore => {
                if(giocatore.name == action.payload.ref){
                    return Object.assign({}, giocatore, {
                        chips: action.payload.chips + giocatore.chips
                    })
                } else {
                    return giocatore
                }
            })
        },
        removeChips: (state, action: {payload: chips}) => {
            return state.map(giocatore => {
                if(giocatore.name == action.payload.ref){
                    return Object.assign({}, giocatore, {
                        chips: giocatore.chips - action.payload.chips
                    })
                } else {
                    return giocatore
                }
            })
        },
    }
})

export default playerSlice.reducer;
export const {addPlayer, addChips, removeChips} = playerSlice.actions;