import { format } from "date-fns";
import { FC } from "react";
import Search from "../../components/Search/Search";

const Header: FC = () => {
    const currentDate = format(new Date(), "EEEE, dd MMMM");

    return (
        <header>
            <div>logo</div>
            <h1>{currentDate}</h1>
            <Search />
            <div>user</div>
        </header>
    );
};

export default Header;
