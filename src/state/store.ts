import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./formPlayer/nPlayerSlice";
import gameSlice from "./gameStatus/gameSlice";

const store = configureStore({
    reducer: {
        giocatori: playerSlice,
        game: gameSlice
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;