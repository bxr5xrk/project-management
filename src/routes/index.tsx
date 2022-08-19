import { Navigate } from "react-router-dom";
import AnalyticsPage from "../pages/privatePages/AnalyticsPage/AnalyticsPage";
import NewProjectModal from "../pages/privatePages/NewProjectModal/NewProjectModal";
import OverviewPage from "../pages/privatePages/OverviewPage/OverviewPage";
import ProjectPage from "../pages/privatePages/ProjectPage/ProjectPage";
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
    { path: "/projects/project/:slugParams", element: <ProjectPage /> },
    { path: "/projects/new", element: <NewProjectModal /> },
    { path: "/tasks", element: <TasksPage /> },
    { path: "/analytics", element: <AnalyticsPage /> },
    { path: "/settings", element: <SettingsPage /> },
    { path: "*", element: <Navigate to="/overview" replace /> },
];
