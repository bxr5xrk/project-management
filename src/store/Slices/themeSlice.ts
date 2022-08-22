import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type theme = "light" | "dark" | string;

interface ITheme {
    theme: theme;
}

const getTheme = (): theme => {
    const data = localStorage.getItem("theme");

    return data ? data : "dark";
};

const initialState: ITheme = {
    theme: getTheme(),
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
