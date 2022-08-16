import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ProjectItemProps {
    title: string;
    description: string;
    totalTime: string;
    slug: string;
}

const ProjectItem: FC<ProjectItemProps> = ({
    title,
    description,
    totalTime,
    slug,
}) => {
    const navigate = useNavigate();

    return (
        <div
            style={{ border: "1px solid #111" }}
            onClick={() => navigate(`./project/${slug}`)}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{totalTime}</p>
        </div>
    );
};

export default ProjectItem;
