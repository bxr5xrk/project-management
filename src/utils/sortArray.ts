import { IProject } from "../types";

export const sortArray = ({
    arr,
    sortType,
}: {
    arr: IProject[];
    sortType: string;
}) => {
    const sortedArr = [...arr];

    if (sortType === "title") {
        return sortedArr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "timeAsc") {
        return sortedArr.sort((a, b) =>
            a.creationDate.localeCompare(b.creationDate)
        );
    } else if (sortType === "timeDesc") {
        return sortedArr.sort((a, b) =>
            b.creationDate.localeCompare(a.creationDate)
        );
    } else {
        return sortedArr;
    }
};
