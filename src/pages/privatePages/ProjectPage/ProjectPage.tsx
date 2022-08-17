import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tasks from "../../../components/Tasks/Tasks";
import { selectUser } from "../../../store/Slices/userSlice";
import { getDistanceBetweenDates } from "../../../utils/getDistanceBetweenDates";

const ProjectPage = () => {
    const { currentUser } = useSelector(selectUser);
    const { slugParams } = useParams();

    const currentProject =
        currentUser && currentUser.projects.find((i) => i.slug === slugParams);

    return (
        <div>
            {currentProject && (
                <>
                    <h1>{currentProject.title}</h1>
                    <h3>{currentProject.description}</h3>
                    <p>notes: {currentProject.notes}</p>
                    <p>
                        status: {currentProject.isComplated ? "active" : "done"}
                    </p>
                    <p>totalTime: {currentProject.totalTime}h</p>
                    <p>
                        {getDistanceBetweenDates(currentProject.creationDate)}
                    </p>
                    <Tasks
                        currentProject={currentProject}
                        tasks={currentProject.tasks}
                    />
                </>
            )}
        </div>
    );
};

export default ProjectPage;
