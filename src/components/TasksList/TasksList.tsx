import { FC, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, setCurrentUser } from "../../store/Slices/userSlice";
import { useAppDispatch } from "../../store/store";
import { IProject, ITask } from "../../types";
import { ChangeCurrentUserData } from "../../utils/changeCurrentUserData";
import { sortArray } from "../../utils/sortArray";
import SortingTypes from "../SortingTypes/SortingTypes";
import TaskItem from "../TaskItem/TaskItem";
import st from "./TasksList.module.scss";
import CheckBox from "../CheckBox/CheckBox";

interface TasksListProps {
    tasks: ITask[];
    currentProject: IProject;
}

const sortingTypes = [
    { value: "timeAsc", title: "sort newest to oldest", id: 1 },
    { value: "timeDesc", title: "sort oldest to newest", id: 2 },
    { value: "title", title: "sort by title", id: 3 },
];

const TasksList: FC<TasksListProps> = ({ tasks, currentProject }) => {
    const { currentUser } = useSelector(selectUser);
    const [showModal, setShowModal] = useState(false);
    const [sortingValue, setSortingValue] = useState(sortingTypes[0].value);
    const [value, setValue] = useState<string>("");
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(false);

    const deleteTask = (id: number) => {
        const newProjects = ChangeCurrentUserData({
            type: "delete task",
            data: {
                id,
                tasks,
                currentProject,
            },
            currentUser,
        });
        if (newProjects && currentUser && typeof newProjects !== "string") {
            dispatch(
                setCurrentUser({
                    ...currentUser,
                    projects: newProjects,
                })
            );
        }
    };

    const createNewTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (value.length > 3) {
            const newProjects = ChangeCurrentUserData({
                type: "add task",
                data: {
                    tasks,
                    currentProject,
                    value,
                },
                currentUser,
            });
            if (currentUser) {
                if (newProjects) {
                    if (typeof newProjects !== "string") {
                        dispatch(
                            setCurrentUser({
                                ...currentUser,
                                projects: newProjects,
                            })
                        );
                    } else {
                        console.log("name finded");
                        return;
                    }
                }
            }
            setValue("");
            setShowModal(false);
        } else {
            console.log("task name must contains more then 3 characters");
        }
    };

    return (
        <div className={st.root}>
            <div className={st.root__top}>
                <h3>Tasks</h3>
                <div className={st.sorting}>
                    <SortingTypes
                        sortingTypes={sortingTypes}
                        sortingValue={sortingValue}
                        setSortingValue={setSortingValue}
                    />
                    <CheckBox
                        title="Show completed"
                        checked={checked}
                        setChecked={setChecked}
                    />
                </div>
            </div>

            <div className={st.addNewTask}>
                {!showModal ? (
                    <button onClick={() => setShowModal(true)}>+</button>
                ) : (
                    showModal && (
                        <div className={st.modal}>
                            <svg
                                onClick={() => setShowModal(false)}
                                width="15px"
                                height="15px"
                                viewBox="0 0 15 15"
                                version="1.1"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#x9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#x9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#x9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#x9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z"
                                />
                            </svg>

                            <form onSubmit={(e) => createNewTask(e)}>
                                <input
                                    autoFocus
                                    type="text"
                                    value={value}
                                    placeholder="enter task name"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <button type="submit">Create</button>
                            </form>
                        </div>
                    )
                )}
            </div>
            {tasks.length ? (
                <>
                    <div className={st.tasks}>
                        {sortArray({
                            arr: tasks,
                            sortType: sortingValue,
                            checked: checked,
                        }).map((task) => (
                            <TaskItem
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                isComplated={task.isComplated}
                                totalTime={task.totalTime}
                                deleteTask={deleteTask}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <h4 className={st.noTasks}>No tasks yet</h4>
            )}
        </div>
    );
};

export default TasksList;
