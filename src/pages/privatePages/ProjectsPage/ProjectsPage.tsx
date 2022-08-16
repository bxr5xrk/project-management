import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectItem from "../../../components/ProjectItem/ProjectItem";
import { selectUser } from "../../../store/Slices/userSlice";

const ProjectsPage = () => {
    const { currentUser } = useSelector(selectUser);

    return (
        <>
            <Link to="./new">+ add new</Link>
            <div style={{ display: "flex" }}>
                {currentUser &&
                    currentUser.projects.map((i) => (
                        <ProjectItem
                            key={i.id}
                            title={i.title}
                            description={i.description}
                            totalTime={i.totalTime}
                            slug={i.slug}
                        />
                    ))}
            </div>
        </>
    );
};

export default ProjectsPage;
