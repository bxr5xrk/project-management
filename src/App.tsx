import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { privateRoutes, publicRoutes } from "./routes";
import { selectAuth } from "./store/Slices/authSlice";

function App() {
    const { isAuth } = useSelector(selectAuth);

    return (
        <>
            {!isAuth ? (
                <Routes>
                    {publicRoutes.map((i) => (
                        <Route key={i.path} path={i.path} element={i.element} />
                    ))}
                </Routes>
            ) : (
                <Layout>
                    <Routes>
                        {privateRoutes.map((i) => (
                            <Route
                                key={i.path}
                                path={i.path}
                                element={i.element}
                            />
                        ))}
                    </Routes>
                </Layout>
            )}
        </>
    );
}

export default App;
