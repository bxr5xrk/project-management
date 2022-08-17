import { IUser } from "../types";

export const searchResults = ({
    currentUser,
    debouncedValue,
}: {
    currentUser: IUser | null;
    debouncedValue: string;
}) => {
    if (currentUser && debouncedValue.length > 2) {
        const projects: { title: string; slug: string; id: number }[] = [];
        currentUser.projects.map(
            (i) =>
                i.title.toLowerCase().includes(debouncedValue.toLowerCase()) &&
                projects.push({ title: i.title, slug: i.slug, id: i.id })
        );
        const tasks: {
            projectTitle: string;
            title: string;
            slug: string;
            id: number;
        }[] = [];
        currentUser.projects.map((i) =>
            i.tasks.map(
                (j) =>
                    j.title
                        .toLowerCase()
                        .includes(debouncedValue.toLowerCase()) &&
                    tasks.push({
                        projectTitle: i.title,
                        title: j.title,
                        slug: i.slug,
                        id: i.id,
                    })
            )
        );

        return { projects, tasks };
    }
};
