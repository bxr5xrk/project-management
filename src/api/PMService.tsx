import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DATA_API } from "../.config";
import { IProject, IUser } from "../types";

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

export const postNewProject = async (
    userId: string,
    newProjects: IProject[]
) => {
    await axios
        .put(DATA_API + `/${userId}`, { projects: newProjects })
        .catch((error) => {
            console.error(error);
        });
};
