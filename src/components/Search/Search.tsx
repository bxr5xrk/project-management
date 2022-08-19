import { FC, KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { IUser } from "../../types";
import { searchResults } from "../../utils/searchResults";
import st from "./Search.module.scss";

interface SearchProps {
    currentUser: IUser;
}

const Search: FC<SearchProps> = ({ currentUser }) => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [projects, setProjects] = useState<
        { title: string; slug: string; id: number }[] | undefined
    >([]);
    const [tasks, setTasks] = useState<
        | { title: string; slug: string; id: number; projectTitle: string }[]
        | undefined
    >([]);

    useEffect(() => {
        if (debouncedValue.length > 3) {
            if (currentUser) {
                setTasks(searchResults({ currentUser, debouncedValue })?.tasks);
                setProjects(
                    searchResults({ currentUser, debouncedValue })?.projects
                );
            }
            setShowModal(true);
        } else if (debouncedValue.length < 3) {
            setTasks([]);
            setProjects([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const onClickLink = (slug: string) => {
        navigate("projects/project/" + slug);
        setShowModal(false);
        setValue("");
    };

    const handleKey = (
        e: KeyboardEvent<HTMLParagraphElement>,
        slug: string
    ) => {
        if (e.key === "Enter") {
            onClickLink(slug);
        }
    };

    const onClickWrapper = () => {
        setShowModal(false);
        setValue("");
    };

    return (
        <>
            {showModal && (
                <div onClick={onClickWrapper} className={st.back}></div>
            )}
            <div className={st.search}>
                <svg
                    width="22px"
                    height="22px"
                    fill="#fff"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 487.95 487.95"
                >
                    <path
                        d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                    />
                </svg>
                <input
                    type="text"
                    value={value}
                    placeholder="Search..."
                    onChange={(e) => setValue(e.target.value)}
                />
                {showModal && (
                    <>
                        {debouncedValue.length > 3 ? (
                            (tasks && tasks.length) ||
                            (projects && projects.length) ? (
                                <div className={st.search__modal}>
                                    <h4>Results:</h4>
                                    <div className={st.line}></div>
                                    {projects && projects.length > 0 && (
                                        <div className={st.group}>
                                            <h4>Projects: </h4>
                                            {projects.map((i, count) => (
                                                <p
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    key={i.id}
                                                    tabIndex={0}
                                                    onClick={() =>
                                                        onClickLink(i.slug)
                                                    }
                                                    onKeyDown={(e) =>
                                                        handleKey(e, i.slug)
                                                    }
                                                >
                                                    {count + 1}. {i.title}
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    {tasks && tasks.length > 0 && (
                                        <div className={st.group}>
                                            <h4>Tasks: </h4>
                                            {tasks.map((i, count) => (
                                                <p
                                                    key={i.id}
                                                    tabIndex={0}
                                                    onClick={() =>
                                                        onClickLink(i.slug)
                                                    }
                                                    onKeyDown={(e) =>
                                                        handleKey(e, i.slug)
                                                    }
                                                >
                                                    {count + 1}. {i.title}
                                                    <span>
                                                        from {i.projectTitle}
                                                    </span>
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    <div className={st.line}></div>
                                    <h4>
                                        Number of results:{" "}
                                        {tasks &&
                                            projects &&
                                            tasks.length + projects.length}
                                    </h4>
                                </div>
                            ) : (
                                <div className={st.search__modal}>
                                    <p>Нічого не знайдено :(</p>
                                </div>
                            )
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Search;
