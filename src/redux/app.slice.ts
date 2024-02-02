import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app_slice",
    initialState: {
        access_token: undefined,
    },
    reducers: {
        setAccessToken(state, action) {
            state.access_token = action.payload
        }
    }
});

export const { setAccessToken } = appSlice.actions;

const appSliceReudcer = appSlice.reducer;

export default appSliceReudcer;