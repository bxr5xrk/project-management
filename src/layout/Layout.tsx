import React, { FC, ReactNode } from "react";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import st from "./Layout.module.scss";

interface LayoutProps {
    children: ReactNode;
    type: "private" | "public";
}

const Layout: FC<LayoutProps> = ({ type, children }) => {
    return (
        <div className="wrapper">
            {type === "private" ? (
                <>
                    <Header />
                    <Nav />
                    <main className={st.root}>{children}</main>
                </>
            ) : (
                <>
                    <main className={st.root}>{children}</main>
                </>
            )}
        </div>
    );
};

export default Layout;
