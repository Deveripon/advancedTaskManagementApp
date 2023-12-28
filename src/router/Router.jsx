import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/inbox", element: <Home /> },
    { path: "/important", element: <Home /> },
    { path: "/not-important", element: <Home /> },
    { path: "/urgent", element: <Home /> },
    { path: "/not-urgent", element: <Home /> },
    { path: "/completed", element: <Home /> },
    { path: "/trashed", element: <Home /> },
    { path: "/today", element: <Home /> },
]);
export default router;
