import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCurrentUser } from "../../api/PMService";
import { selectAuth, setAuth } from "../../store/Slices/authSlice";
import { useAppDispatch } from "../../store/store";

const navItems = [
    {
        id: 1,
        title: "Overview",
        href: "/overview",
    },
    {
        id: 2,
        title: "Projects",
        href: "/projects",
    },
    {
        id: 3,
        title: "Tasks",
        href: "/tasks",
    },
    {
        id: 4,
        title: "Settings",
        href: "/settings",
    },
];

const Nav = () => {
    const dispatch = useAppDispatch();
    const { isAuth } = useSelector(selectAuth);

    const logOut = () => {
        dispatch(setAuth(null));
        localStorage.clear();
    };

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchCurrentUser({ id: isAuth.id }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <nav>
            {navItems.map((i) => (
                <Link key={i.id} to={i.href}>
                    {i.title}
                </Link>
            ))}
            <button onClick={logOut}>logOut</button>
        </nav>
    );
};

export default Nav;
