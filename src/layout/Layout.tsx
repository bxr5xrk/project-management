import React, { FC, ReactNode } from "react";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import st from './main.module.scss'

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Nav />
            <main className={st.root}>{children}</main>
        </>
    );
};

export default Layout;
