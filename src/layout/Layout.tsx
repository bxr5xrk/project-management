import { FC, ReactNode, useEffect } from "react";
import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import st from "./Layout.module.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../store/Slices/themeSlice";
import { themes } from "../.config";

interface LayoutProps {
    children: ReactNode;
    type: "private" | "public";
}

const Layout: FC<LayoutProps> = ({ type, children }) => {
    const { theme } = useSelector(selectTheme);

    useEffect(() => {
        if (theme === "dark") {
            themes.dark.map((i) =>
                document.documentElement.style.setProperty(i.variable, i.value)
            );
        } else {
            themes.light.map((i) =>
                document.documentElement.style.setProperty(i.variable, i.value)
            );
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

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
