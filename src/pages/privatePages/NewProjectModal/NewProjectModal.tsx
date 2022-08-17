import { FC, FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, setCurrentUser } from "../../../store/Slices/userSlice";
import { useAppDispatch } from "../../../store/store";
import { ChangeCurrentUserData } from "../../../utils/changeCurrentUserData";

const NewProjectModal: FC = () => {
    const [value, setValue] = useState<string>("");
    const [desc, setDesc] = useState("");
    const { currentUser } = useSelector(selectUser);
    const messageRef = useRef("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const createNewProject = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentUser) {
            const newProjects = ChangeCurrentUserData({
                type: "add project",
                currentUser,
                createNewProject: {
                    value,
                    desc,
                },
            });

            if (newProjects) {
                if (typeof newProjects !== "string") {
                    messageRef.current = "success";
                    dispatch(
                        setCurrentUser({
                            ...currentUser,
                            projects: newProjects,
                        })
                    );
                    setValue("");
                    setDesc("");
                } else {
                    messageRef.current =
                        value + " already exists, enter a different name";
                }
            }
        }
        navigate(
            `/projects/project/${value.replaceAll(" ", "-").toLowerCase()}`
        );
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
