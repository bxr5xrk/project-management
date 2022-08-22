import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./Slices/authSlice";
import themeSlice from "./Slices/themeSlice";
import userSlice from "./Slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        auth: authSlice,
        theme: themeSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
