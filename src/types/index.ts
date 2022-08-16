export interface ITask {
    id: number;
    title: string;
    creationDate: string;
    description: string;
    isComplated: boolean;
    totalTime: string;
}

export interface IProject {
    id: number;
    title: string;
    slug: string;
    description: string;
    notes: string;
    creationDate: string;
    totalTime: string;
    isComplated: boolean;
    tasks: ITask[];
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    projects: IProject[];
}
