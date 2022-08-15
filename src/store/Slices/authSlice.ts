import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IAuthData {
    name: string;
    email: string;
    password: string;
    id: string;
}

interface userSliceState {
    isAuth: IAuthData | null;
}

const checkAuth = () => {
    const data = localStorage.getItem("authData");
    return data ? JSON.parse(data) : null;
};

const initialState: userSliceState = {
    isAuth: checkAuth(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<IAuthData | null>) {
            state.isAuth = action.payload;
        },
    },
});

export const { setAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
