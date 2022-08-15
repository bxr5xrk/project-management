import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/Slices/userSlice";

const ProjectsPage = () => {
    const { currentUser } = useSelector(selectUser);

    return (
        <div>
            {currentUser &&
                currentUser.projects.map((i) => (
                    <div key={i.id}>
                        <h3> {i.title}</h3>
                        <h4>{i.description}</h4>
                    </div>
                ))}
        </div>
    );
};

export default ProjectsPage;
