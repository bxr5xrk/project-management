import { format } from "date-fns";
import { FC } from "react";

const Header: FC = () => {
    const currentDate = format(new Date(), "EEEE, dd MMMM");

    return (
        <header>
            <div>logo</div>
            <h1>{currentDate}</h1>
            <div>search</div>
            <div>user</div>
        </header>
    );
};

export default Header;
