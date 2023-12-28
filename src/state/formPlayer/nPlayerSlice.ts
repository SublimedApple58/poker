import { createSlice } from "@reduxjs/toolkit";

interface cardsToAdd{
    carte: number[],
    index: number
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

export interface carteCentrali{
    numero: number,
    isVisible: boolean
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
        setPlayerCards: (state, action: {payload: cardsToAdd}) => {
            return Object.assign({}, state, {
                players: state.players.map((player, i) => {
                    if(i == action.payload.index){
                        return Object.assign({}, player, {
                            carte: action.payload.carte
                        });
                    } else {
                        return player
                    }
                })
            })
        },
        setCentralCardVisible: (state, action: {payload: number}) => {
            return Object.assign({}, state, {
                centralCards: state.centralCards.map((carta, i) => i<action.payload+1 ? Object.assign({}, carta, {isVisible: true}) : Object.assign({}, carta, {isVisible: false}))
            })
        },
        resetCards: (state) => {
            return Object.assign({}, state, {
                centralCards: [],
                players: state.players.map(player => {
                    return Object.assign({}, player, {
                        carte: []
                    });
                })
            })
        }
    }
})

export default playerSlice.reducer;
export const {addPlayer, win, removeChips, setCentralCards, setCentralCardVisible, resetCards, setPlayerCards} = playerSlice.actions;