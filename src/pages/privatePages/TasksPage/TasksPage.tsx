import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/Slices/userSlice";
import { ITask, IUser } from "../../../types";

const TasksPage = () => {
    const { currentUser } = useSelector(selectUser);
    const [tasks, setTasks] = useState<ITask[]>([]);

    const getAllTasks = (currentUser: IUser) => {
        const newArr: ITask[] = [];

        currentUser.projects.map((i) => i.tasks.map((j) => newArr.push(j)));

        // sort

        return newArr;
    };

    useEffect(() => {
        if (currentUser) {
            setTasks(getAllTasks(currentUser));
        }
    }, [currentUser]);

    return (
        <div>
            <h2>Tasks</h2>
            {currentUser &&
                tasks.map((i, index) => (
                    <div key={index}>
                        <h3> {i.title}</h3>
                        <h4>{i.description}</h4>
                    </div>
                ))}
        </div>
    );
};

export default TasksPage;
