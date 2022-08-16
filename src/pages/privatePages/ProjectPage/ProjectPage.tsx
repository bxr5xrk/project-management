import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
                    <div>
                        <h3>Tasks</h3>
                        <button>+ create new</button>
                        {currentProject.tasks.length ? (
                            currentProject.tasks.map((i) => (
                                <div key={i.id}>
                                    <h4>{i.title}</h4>
                                    <p>{i.isComplated ? "active" : "done"}</p>
                                    <p>totalTime: {i.totalTime}</p>
                                </div>
                            ))
                        ) : (
                            <p>no tasks yet</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProjectPage;
