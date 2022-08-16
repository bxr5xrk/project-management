import { format } from "date-fns";
import { FC, FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { postNewProject } from "../../../api/PMService";
import { selectUser, setCurrentUser } from "../../../store/Slices/userSlice";
import { useAppDispatch } from "../../../store/store";
import { IProject } from "../../../types";

const NewProjectModal: FC = () => {
    const [value, setValue] = useState<string>("");
    const [desc, setDesc] = useState("");
    const { currentUser } = useSelector(selectUser);
    const messageRef = useRef("");
    const dispatch = useAppDispatch();

    const createNewProject = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentUser) {
            const date = format(new Date(), "yyyy:MM:dd");
            const findProjectName = currentUser.projects.find(
                (i: IProject) => i.title === value
            );

            if (!findProjectName) {
                messageRef.current = "success";
                const newProject = {
                    id:
                        currentUser.projects[currentUser.projects.length - 1]
                            .id + 1,
                    title: value,
                    description: desc,
                    notes: "",
                    complated: false,
                    totalTime: "00:00",
                    creationDate: date,
                    tasks: [],
                };
                const newProjects = [...currentUser.projects, newProject];
                const userId = currentUser.id;
                userId && postNewProject(userId, newProjects);

                dispatch(
                    setCurrentUser({ ...currentUser, projects: newProjects })
                );
            } else {
                messageRef.current =
                    value + " already exists, enter a different name";
            }
            setValue("");
            setDesc("");
        }
    };

    return (
        <div>
            <h2>New project</h2>

            <form onSubmit={(e) => createNewProject(e)}>
                <input
                    autoFocus
                    type="text"
                    value={value}
                    placeholder="enter project name"
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
    );
};

export default NewProjectModal;
