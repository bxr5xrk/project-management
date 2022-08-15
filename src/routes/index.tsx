import { Navigate } from "react-router-dom";
import OverviewPage from "../pages/privatePages/OverviewPage/OverviewPage";
import ProjectsPage from "../pages/privatePages/ProjectsPage/ProjectsPage";
import SettingsPage from "../pages/privatePages/SettingsPage/SettingsPage";
import TasksPage from "../pages/privatePages/TasksPage/TasksPage";
import LandingPage from "../pages/publicPages/LandingPage/LandingPage";
import LoginPage from "../pages/publicPages/LoginPage/LoginPage";

export const publicRoutes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
];

export const privateRoutes = [
    { path: "/overview", element: <OverviewPage /> },
    { path: "/projects", element: <ProjectsPage /> },
    { path: "/tasks", element: <TasksPage /> },
    { path: "/settings", element: <SettingsPage /> },
    { path: "*", element: <Navigate to="/overview" replace /> },
];
