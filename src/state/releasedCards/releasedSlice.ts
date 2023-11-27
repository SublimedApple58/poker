import { createSlice } from "@reduxjs/toolkit";

interface releasedState{
    mazzo: number[],
    carteUscite: number[],
    length: number
}

const initialState: releasedState = {
    mazzo: Array.from({length: 52}, (_, i) => i+1),
    carteUscite: [],
    length: 0
}

const releaseSlice = createSlice({
    name: "carteUscite",
    initialState,
    reducers: {
        giveCard: (state) =>{
            const estrazione = Math.floor(Math.random()*state.mazzo.length);
            const cartaEstratta = state.mazzo.splice(estrazione, 1)[0];
            state.carteUscite.push(cartaEstratta);
            state.length += 1;
        }
    }
})

export default releaseSlice.reducer;
export const {giveCard} = releaseSlice.actions;