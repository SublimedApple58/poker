import { createSlice } from "@reduxjs/toolkit";

interface players{
    players: any[],
    centralChips: number,
    centralCards: number[]
}

const initialState: players ={
    players: [],
    centralChips: 0,
    centralCards: []
}

interface scommessa{
    ref: number,
    chips: number
}

const playerSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        addPlayer: (state, action: {payload: any}) => {
            return Object.assign({}, state, {
                players: [...state.players, action.payload]
            })
        },
        removeChips: (state, action: {payload: scommessa}) => {

            return Object.assign({}, state, {
                players: state.players.map(giocatore => {
                    if(giocatore.name == action.payload.ref){
                        return Object.assign({}, giocatore, {
                            chips: giocatore.chips - action.payload.chips 
                        })
                    } else {
                        return giocatore;
                    }
                }),
                centralChips: state.centralChips + action.payload.chips
            })
        },
        win: (state, action: {payload: number}) => {
            return Object.assign({}, state, {
                players: state.players.map(giocatore => {
                    if(giocatore.name == action.payload){
                        return Object.assign({}, state, {
                            chips: giocatore.chips + state.centralChips
                        })
                    } else {
                        return giocatore
                    }
                }),
                centralChips: 0,
            })
        },
        setCentralCars: (state, action: {payload: number[]}) => {
            return Object.assign({}, state, {
                centralCards: Array.from(action.payload)
            })
        }
    }
})

export default playerSlice.reducer;
export const {addPlayer, win, removeChips, setCentralCars} = playerSlice.actions;