import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./formPlayer/nPlayerSlice";
import releasedSlice from "./releasedCards/releasedSlice";
import ChipsSlice from "./Chips/ChipsSlice";

const store = configureStore({
    reducer: {
        giocatori: playerSlice,
        carteUscite: releasedSlice,
        chips: ChipsSlice,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;