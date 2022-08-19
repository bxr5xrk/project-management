import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectItem from "../../../components/ProjectItem/ProjectItem";
import SortingTypes from "../../../components/SortingTypes/SortingTypes";
import { selectUser } from "../../../store/Slices/userSlice";
import { sortArray } from "../../../utils/sortArray";
import st from "./ProjectsPage.module.scss";
import CheckBox from "../../../components/CheckBox/CheckBox";

const sortingTypes = [
    { value: "timeAsc", title: "sort newest to oldest", id: 1 },
    { value: "timeDesc", title: "sort oldest to newest", id: 2 },
    { value: "title", title: "sort by title", id: 3 },
];

const ProjectsPage = () => {
    const { currentUser } = useSelector(selectUser);
    const [sortingValue, setSortingValue] = useState(sortingTypes[0].value);
    const [checked, setChecked] = useState(false);

    return (
        <div className={st.root}>
            <div className={st.root__top}>
                <div className={st.sorting}>
                    <SortingTypes
                        sortingTypes={sortingTypes}
                        sortingValue={sortingValue}
                        setSortingValue={setSortingValue}
                    />
                    <CheckBox
                        title="Show completed"
                        checked={checked}
                        setChecked={setChecked}
                    />
                </div>

                <Link to="./new" className={st.newProject}>
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15px"
                        height="15px"
                        fill="white"
                        viewBox="0 0 45.402 45.402"
                    >
                        <path
                            d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                        />
                    </svg>
                </Link>
            </div>
            <div className={st.line}></div>

            <div className={st.projects}>
                {currentUser &&
                    sortArray({
                        arr: currentUser.projects,
                        sortType: sortingValue,
                        checked: checked,
                    }).map((i) => (
                        <ProjectItem
                            tasks={i.tasks}
                            key={i.id}
                            title={i.title}
                            creationDate={i.creationDate}
                            slug={i.slug}
                            id={i.id}
                            currentUser={currentUser}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
