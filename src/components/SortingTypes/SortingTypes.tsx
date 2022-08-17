import { FC } from "react";

interface ISortType {
    id: number;
    value: string;
    title: string;
}

interface SortingTypesProps {
    sortingTypes: ISortType[];
    sortingValue: string;
    setSortingValue: (val: string) => void;
}

const SortingTypes: FC<SortingTypesProps> = ({
    sortingTypes,
    sortingValue,
    setSortingValue,
}) => {
    return (
        <select
            value={sortingValue}
            onChange={(e) => setSortingValue(e.target.value)}
        >
            {sortingTypes.map((i) => (
                <option key={i.id} value={i.value}>
                    {i.title}
                </option>
            ))}
        </select>
    );
};

export default SortingTypes;
