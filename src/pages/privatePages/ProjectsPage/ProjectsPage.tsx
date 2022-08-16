import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../store/Slices/userSlice";

const ProjectsPage = () => {
    const { currentUser } = useSelector(selectUser);

    return (
        <>
            <Link to="./new">+ add new</Link>
            <div>
                {currentUser &&
                    currentUser.projects.map((i) => (
                        <div key={i.id}>
                            <h3> {i.title}</h3>
                            <h4>{i.description}</h4>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ProjectsPage;
