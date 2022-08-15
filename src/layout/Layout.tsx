import React, { FC, ReactNode } from "react";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <Nav />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
