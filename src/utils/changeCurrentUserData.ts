import { format } from "date-fns";
import { postNewProject } from "../api/PMService";
import { IProject, ITask, IUser } from "../types";

interface changeCurrentUserDataProps {
    type: "delete task" | "delete project" | "add task" | "add project";
    data?: {
        id?: number;
        tasks: ITask[];
        currentProject: IProject;
        value?: string;
        desc?: string;
    };
    projectId?: number;
    currentUser: IUser | null;
    createNewProject?: {
        value: string;
        desc: string;
    };
}

export const ChangeCurrentUserData = ({
    type,
    data,
    currentUser,
    projectId,
    createNewProject,
}: changeCurrentUserDataProps) => {
    if (type === "delete task" && currentUser && data) {
        const newTasks = data.tasks.filter((i) => i.id !== data.id);

        if (currentUser) {
            const newCurrentProject = {
                ...data.currentProject,
                tasks: newTasks,
            };

            const newProjects = [
                ...currentUser.projects.filter(
                    (i) => i.id !== data.currentProject.id
                ),
                newCurrentProject,
            ];

            const userId = currentUser.id;
            userId && postNewProject(userId, newProjects);

            return newProjects;
        }
    } else if (type === "delete project" && currentUser) {
        const newProjects = currentUser.projects.filter(
            (i) => i.id !== projectId
        );
        currentUser.id && postNewProject(currentUser.id, newProjects);

        return newProjects;
    } else if (type === "add project" && currentUser && createNewProject) {
        const findProjectName = currentUser.projects.find(
            (i: IProject) => i.title === createNewProject.value
        );
        if (!findProjectName) {
            const newProject = {
                id: Date.now(),
                title:
                    createNewProject.value[0].toUpperCase() +
                    createNewProject.value.slice(1),
                slug: createNewProject.value.replaceAll(" ", "-").toLowerCase(),
                description: createNewProject.desc,
                notes: "",
                isComplated: false,
                totalTime: "00:00",
                creationDate: format(new Date(), "yyyy:MM:dd:HH:mm"),
                tasks: [],
            };

            const newProjects = [...currentUser.projects, newProject];
            const userId = currentUser.id;
            userId && postNewProject(userId, newProjects);

            return newProjects;
        } else {
            return "finded project";
        }
    } else if (type === "add task" && currentUser && data) {
        const findTaskName = data.tasks.find(
            (i: ITask) => i.title === data.value
        );

        if (!findTaskName && data.value && data.desc !== undefined) {
            const newTask = {
                id: Date.now(),
                title: data.value[0].toUpperCase() + data.value.slice(1),
                creationDate: format(new Date(), "yyyy:MM:dd:HH:mm"),
                isComplated: false,
                description: data.desc,
                totalTime: "00:00",
            };

            const newTasks = [...data.tasks, newTask];
            const newCurrentProject = {
                ...data.currentProject,
                tasks: newTasks,
            };

            const newProjects = [
                ...currentUser.projects.filter(
                    (i) => i.id !== data.currentProject.id
                ),
                newCurrentProject,
            ];

            const userId = currentUser.id;
            userId && postNewProject(userId, newProjects);
            return newProjects;
        } else {
            return "finded project";
        }
    }
};
