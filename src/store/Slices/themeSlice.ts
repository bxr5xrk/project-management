import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type theme = "light" | "dark";

interface ITheme {
    theme: theme;
}

const initialState: ITheme = {
    theme: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<theme>) {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
