import { format } from "date-fns";
import { FC } from "react";
import { useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import { selectUser } from "../../store/Slices/userSlice";
import st from "./Header.module.scss";

const Header: FC = () => {
    const { currentUser } = useSelector(selectUser);

    return (
        <header className={st.root}>
            {currentUser && (
                <>
                    <h2>{format(new Date(), "EEEE, dd MMMM")}</h2>
                    <Search currentUser={currentUser} />
                    <div className={st.user}>
                        <p>{currentUser.name}</p>
                        <svg
                            width="24px"
                            height="24px"
                            fill="#fff"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 16a1 1 0 0 1-.707-.293L5.636 10.05A1 1 0 0 1 7.05 8.636l4.95 4.95 4.95-4.95a1 1 0 0 1 1.414 1.414l-5.657 5.657A1 1 0 0 1 12 16z" />
                        </svg>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
