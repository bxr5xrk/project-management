import { format, setDefaultOptions } from "date-fns";
import { uk } from "date-fns/locale";
import React from "react";

const Header = () => {
    setDefaultOptions({ locale: uk });

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
