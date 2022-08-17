import { FC, FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, setCurrentUser } from "../../store/Slices/userSlice";
import { useAppDispatch } from "../../store/store";
import { IProject, ITask } from "../../types";
import { ChangeCurrentUserData } from "../../utils/changeCurrentUserData";
import { sortArray } from "../../utils/sortArray";
import SortingTypes from "../SortingTypes/SortingTypes";

interface TasksProps {
    tasks: ITask[];
    currentProject: IProject;
}

const sortingTypes = [
    { value: "timeAsc", title: "sort newest to oldest", id: 1 },
    { value: "timeDesc", title: "sort oldest to newest", id: 2 },
    { value: "title", title: "sort by title", id: 3 },
];

const Tasks: FC<TasksProps> = ({ tasks, currentProject }) => {
    const { currentUser } = useSelector(selectUser);
    const [showModal, setShowModal] = useState(false);
    const [sortingValue, setSortingValue] = useState(sortingTypes[0].value);
    const [value, setValue] = useState<string>("");
    const [desc, setDesc] = useState("");
    const messageRef = useRef("");
    const dispatch = useAppDispatch();

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
                    desc,
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
                        messageRef.current = "name finded";
                        console.log("name finded");
                        return;
                    }
                }
            }
            setValue("");
            setDesc("");
            messageRef.current = "created!";
        } else {
            console.log("task name must contains more then 3 characters");
        }
    };

    return (
        <div>
            <h3>Tasks</h3>
            <button onClick={() => setShowModal(true)}>+ create new</button>

            {showModal && (
                <div>
                    <h2>New Task</h2>

                    <form onSubmit={(e) => createNewTask(e)}>
                        <input
                            autoFocus
                            type="text"
                            value={value}
                            placeholder="enter task name"
                            onChange={(e) => setValue(e.target.value)}
                        />

                        <input
                            type="text"
                            value={desc}
                            placeholder="enter description"
                            onChange={(e) => setDesc(e.target.value)}
                        />

                        <button type="submit">create</button>
                    </form>

                    {messageRef.current && <p>{messageRef.current}</p>}
                </div>
            )}

            {tasks.length ? (
                <>
                    <SortingTypes
                        sortingTypes={sortingTypes}
                        sortingValue={sortingValue}
                        setSortingValue={setSortingValue}
                    />

                    {sortArray({
                        arr: tasks,
                        sortType: sortingValue,
                    }).map((i) => (
                        <div key={i.id} style={{ border: "1px solid #111" }}>
                            <button onClick={() => deleteTask(i.id)}>
                                delete
                            </button>
                            <h4>{i.title}</h4>
                            <p>{!i.isComplated ? "active" : "done"}</p>
                            <p>totalTime: {i.totalTime}</p>
                        </div>
                    ))}
                </>
            ) : (
                <p>no tasks yet</p>
            )}
        </div>
    );
};

export default Tasks;
