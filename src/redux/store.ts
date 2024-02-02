import { configureStore } from "@reduxjs/toolkit";
import appSliceReducer from "./app.slice";

const store = configureStore({
    reducer: {
        appReducer: appSliceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;