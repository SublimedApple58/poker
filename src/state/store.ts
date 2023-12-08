import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./formPlayer/nPlayerSlice";
import releasedSlice from "./releasedCards/releasedSlice";
import gameSlice from "./gameStatus/gameSlice";

const store = configureStore({
    reducer: {
        giocatori: playerSlice,
        carteUscite: releasedSlice,
        partita: gameSlice
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;