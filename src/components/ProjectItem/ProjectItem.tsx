import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../store/Slices/userSlice";
import { useAppDispatch } from "../../store/store";
import { IUser } from "../../types";
import { ChangeCurrentUserData } from "../../utils/changeCurrentUserData";

interface ProjectItemProps {
    title: string;
    description: string;
    totalTime: string;
    slug: string;
    id: number;
    currentUser: IUser;
}

const ProjectItem: FC<ProjectItemProps> = ({
    title,
    description,
    totalTime,
    slug,
    id,
    currentUser,
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const deleteProject = (id: number) => {
        const newProjects = ChangeCurrentUserData({
            type: "delete project",
            projectId: id,
            currentUser,
        });
        if (newProjects && typeof newProjects !== "string") {
            dispatch(
                setCurrentUser({
                    ...currentUser,
                    projects: newProjects,
                })
            );
        }
    };

    return (
        <div style={{ border: "1px solid #111" }}>
            <button onClick={() => deleteProject(id)}>delete</button>
            <h3 onClick={() => navigate(`./project/${slug}`)}>{title}</h3>
            <p>{description}</p>
            <p>{totalTime}</p>
        </div>
    );
};

export default ProjectItem;
