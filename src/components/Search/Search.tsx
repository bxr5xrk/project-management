import { KeyboardEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { selectUser } from "../../store/Slices/userSlice";
import { IUser } from "../../types";

const results = ({
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

const Search = () => {
    const { currentUser } = useSelector(selectUser);
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (debouncedValue.length > 3) {
            setShowModal(true);
        }
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

    return (
        <div style={{ position: "relative" }}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {showModal && (
                <div
                    style={{
                        position: "absolute",
                        backgroundColor: "aliceblue",
                    }}
                >
                    {results({ currentUser, debouncedValue })?.projects
                        .length ? (
                        <>
                            <h4>Projects: </h4>
                            {results({
                                currentUser,
                                debouncedValue,
                            })?.projects.map((i) => (
                                <p
                                    style={{ cursor: "pointer" }}
                                    key={i.id}
                                    tabIndex={0}
                                    onClick={() => onClickLink(i.slug)}
                                    onKeyDown={(e) => handleKey(e, i.slug)}
                                >
                                    {i.title}
                                </p>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}

                    {results({
                        currentUser,
                        debouncedValue,
                    })?.tasks.length ? (
                        <>
                            <h4>Tasks: </h4>
                            {results({
                                currentUser,
                                debouncedValue,
                            })?.tasks.map((i) => (
                                <p
                                    key={i.id}
                                    tabIndex={0}
                                    onClick={() => onClickLink(i.slug)}
                                    onKeyDown={(e) => handleKey(e, i.slug)}
                                >
                                    {i.title}
                                    <span>from {i.projectTitle}</span>
                                </p>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
