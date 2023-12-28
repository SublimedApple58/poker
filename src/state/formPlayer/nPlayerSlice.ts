import { createSlice } from "@reduxjs/toolkit";

export interface carteCentrali{
    numero: number,
    isVisible: boolean
}

interface player{
    name: number,
    chips: number,
    isVisible: boolean,
    side: number,
    carte: number[]
}

interface players{
    players: player[],
    centralChips: number,
    centralCards: carteCentrali[]
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
                players: state.players.map((giocatore, i) => {
                    if(giocatore.name == action.payload){
                        return Object.assign({}, state.players[i], {
                            chips: giocatore.chips + state.centralChips
                        })
                    } else {
                        return giocatore
                    }
                }),
                centralChips: 0,
            })
        },
        setCentralCards: (state, action: {payload: carteCentrali[]}) => {
            return Object.assign({}, state, {
                centralCards: Array.from(action.payload)
            })
        },
        setVisible: (state, action: {payload: number}) => {
            return Object.assign({}, state, {
                centralCards: state.centralCards.map((carta, i) => i<action.payload+1 ? Object.assign({}, carta, {isVisible: true}) : Object.assign({}, carta, {isVisible: false}))
            })
        }
    }
})

export default playerSlice.reducer;
export const {addPlayer, win, removeChips, setCentralCards, setVisible} = playerSlice.actions;