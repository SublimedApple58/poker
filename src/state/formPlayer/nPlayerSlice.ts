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
    done: boolean
}

interface players{
    players: player[],
    centralChips: number,
    centralCards: carteCentrali[],
    playersInManche: number[],
    playersInGame: number[],
    playersBetting: number[]
}

export interface carteCentrali{
    numero: number,
    isVisible: boolean
}

const initialState: players ={
    players: [],
    playersInManche: [],
    playersInGame: [],
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
        addPlayer: (state, action: {payload: any}) => {
            return Object.assign({}, state, {
                players: [...state.players, action.payload],
                playersInManche: [...state.playersInManche, action.payload.name],
                playersBetting: [...state.playersInManche, action.payload.name],
                playersInGame: [...state.playersInManche, action.payload.name]
            })
        },
        outOfManche: (state, action: {payload: number}) =>{
            const arrayProvvisorio = [...state.playersInManche];
            arrayProvvisorio.splice(arrayProvvisorio.indexOf(action.payload), 1)
            return Object.assign({}, state, {
                playersInManche: arrayProvvisorio
            })
        },
        moveDone: (state, action: {payload: number}) => {
            return Object.assign({}, state, {players: state.players.map(giocatore => giocatore.name == action.payload ? Object.assign({}, giocatore, {done: true}) : giocatore)})
        },
        resetDone: (state, action: {payload: number[]}) => {
            return Object.assign({}, state, {players: state.players.map(giocatore => {
                let existent: boolean = false;
                for(let i = 0; i<action.payload.length; i++){
                    giocatore.name == action.payload[i] ? existent = true : existent;
                }
                return Object.assign({}, giocatore, {done: !existent})
            })})
        },
        updatePlayersBetting: (state) => {return Object.assign({}, state, {playersBetting: [...state.playersInManche]})},
        updatePlayersInManche: (state) => {return Object.assign({}, state, {playersInManche: [...state.playersInGame]})},
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
export const {addPlayer, outOfManche, moveDone, resetDone, updatePlayersBetting, updatePlayersInManche, win, removeChips, setCentralCards, setCentralCardVisible, resetCards, setPlayerCards, showAll, hideAll} = playerSlice.actions;