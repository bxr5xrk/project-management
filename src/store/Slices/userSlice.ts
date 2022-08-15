import { fetchCurrentUser } from "./../../api/PMService";
import { IUser } from "./../../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersData } from "../../api/PMService";
import { RootState } from "../store";

interface userSliceState {
    status: "loading" | "success" | "rejected";
    usersData: IUser[];
    currentUser: IUser | null;
}

const initialState: userSliceState = {
    status: "loading",
    usersData: [],
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<IUser>) {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersData.pending, (state) => {
            state.status = "loading";
            state.usersData = [];
        });
        builder.addCase(
            fetchUsersData.fulfilled,
            (state, action: PayloadAction<IUser[]>) => {
                state.status = "success";
                state.usersData = action.payload;
            }
        );
        builder.addCase(fetchUsersData.rejected, (state) => {
            state.status = "rejected";
            state.usersData = [];
        });
        // currentUser
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.status = "loading";
            state.currentUser = null;
        });
        builder.addCase(
            fetchCurrentUser.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.status = "success";
                state.currentUser = action.payload;
            }
        );
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.status = "rejected";
            state.currentUser = null;
        });
    },
});

export const { setCurrentUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
