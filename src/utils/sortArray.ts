interface sortArrayProps {
    arr: any;
    sortType: string;
    checked: boolean;
}

export const sortArray = ({ arr, sortType, checked }: sortArrayProps) => {
    const sortedArr = !checked
        ? [
              ...arr.filter(
                  (i: { isComplated: boolean }) => i.isComplated !== true
              ),
          ]
        : [...arr];

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
