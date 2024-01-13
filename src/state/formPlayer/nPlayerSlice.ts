import { createSlice } from "@reduxjs/toolkit";

interface cardsToAdd{
    carte: number[],
    index: number
}

interface player{
    name: number,
    chips: number,
    isUser: boolean
    isVisible: boolean,
    side: number,
    carte: number[],
    done: boolean,
    bet: number,
    inManche: boolean,
    inGame: boolean
}

export interface carteCentrali{
    numero: number,
    isVisible: boolean
}

interface players{
    players: player[],
    playersCopy: player[],
    centralChips: number,
    centralCards: carteCentrali[],
    playersBetting: number[]
}

const initialState: players ={
    players: [],
    playersCopy: [],
    centralChips: 0,
    centralCards: [],
    playersBetting: []
}

interface scommessa{
    ref: number,
    chips: number
}

const playerSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        addPlayer: (state, action: {payload: player}) => {
            return Object.assign({}, state, {
                players: [...state.players, action.payload]
            })
        },
        updateCopy: (state) => {
            return Object.assign({}, state, {playersCopy: [...state.players]})
        },
        outOfManche: (state, action: {payload: number}) =>{
            return Object.assign({}, state, {players: state.players.map(giocatore => {
                if(giocatore.name == action.payload){
                    return Object.assign({}, giocatore, {inManche: false})
                } else {
                    return giocatore
                }
            })})
        },
        outOfGame: (state, action: {payload: number}) => {
            return Object.assign({}, state, {players: state.players.map(giocatore => {
                if(giocatore.name == action.payload){
                    return Object.assign({}, giocatore, {inGame: false})
                } else {
                    return giocatore
                }
            })})
        },
        moveDone: (state, action: {payload: number}) => {
            return Object.assign({}, state, {players: state.players.map(giocatore => giocatore.name == action.payload ? Object.assign({}, giocatore, {done: true}) : giocatore)})
        },
        raiseDone: (state) => {
            return Object.assign({}, state, {players: state.players.map(giocatore => {
                if(giocatore.inManche){
                    return Object.assign({}, giocatore, {done: false})
                } else {
                    return giocatore;
                }
            })})
        },
        resetDone: (state) => {
            return Object.assign({}, state, {
                players: state.players.map(giocatore => {
                    if(giocatore.inManche){
                        return Object.assign({}, giocatore, {done: false})
                    } else {
                        return giocatore;
                    }
                }),
                playersCopy: state.players.map(giocatore => {
                    if(giocatore.inManche){
                        return Object.assign({}, giocatore, {done: false})
                    } else {
                        return giocatore;
                    }
                })
            })
        },
        setPlayerBet: (state, action: {payload: scommessa}) => {
            return Object.assign({}, state, {players: state.players.map(giocatore => {
                if(giocatore.name == action.payload.ref){
                    return Object.assign({}, giocatore, {bet: action.payload.chips})
                } else {
                    return giocatore
                }
            })})
        },
        resetPlayersBet: (state) => {
            return Object.assign({}, state, {players: state.players.map(giocatore => {
                return Object.assign({}, giocatore, {bet: 0})
            })})
        },
        updatePlayersInManche: (state) => {return Object.assign({}, state, {players: state.players.map(giocatore => Object.assign({}, giocatore, {inManche: giocatore.inGame}))})},
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
        setCentralCardVisible: (state, action: {payload: number}) => { // da fare refactory
            return Object.assign({}, state, {
                centralCards: state.centralCards.map((carta, i) => Object.assign({}, carta, {isVisible: i<action.payload+1}))
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
        },
        showAll: (state) => {
            return Object.assign({}, state, {
                players: state.players.map(player => Object.assign({}, player, { isVisible: true}))
            })
        }, 
        hideAll: (state) => {
            return Object.assign({}, state, {
                players: state.players.map(player => Object.assign({}, player, { isVisible: player.isUser}))
            })
        }
    }
})

export default playerSlice.reducer;
export const {addPlayer, updateCopy, outOfManche, outOfGame, moveDone, resetDone, raiseDone, setPlayerBet, resetPlayersBet, updatePlayersInManche, win, removeChips, setCentralCards, setCentralCardVisible, resetCards, setPlayerCards, showAll, hideAll} = playerSlice.actions;