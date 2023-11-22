import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./formPlayer/nPlayerSlice";

const store = configureStore({
    reducer: {
        // giocatori:
        giocatori: playerSlice,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;