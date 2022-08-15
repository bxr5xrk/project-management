import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DATA_API } from "../.config";
import { IUser } from "../types";

export const fetchUsersData = createAsyncThunk(
    "users/fetchUserData",
    async () => {
        const { data } = await axios.get<IUser[]>(DATA_API);

        return data;
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "users/fetchCurrentUset",
    async ({ id }: { id: string }) => {
        const { data } = await axios.get<IUser>(DATA_API + `/${id}`);

        return data;
    }
);
