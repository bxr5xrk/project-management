export const sortArray = ({
    arr,
    sortType,
}: {
    arr: any;
    sortType: string;
}) => {
    const sortedArr = [...arr];

    if (sortType === "title") {
        return sortedArr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "timeAsc") {
        return sortedArr.sort((a, b) =>
            b.creationDate.localeCompare(a.creationDate)
        );
    } else if (sortType === "timeDesc") {
        return sortedArr.sort((a, b) =>
            a.creationDate.localeCompare(b.creationDate)
        );
    } else {
        return sortedArr;
    }
};
