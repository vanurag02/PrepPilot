/* =============== BROWSER ROTUER IMPORT =============== */
import { createBrowserRouter } from "react-router";

/* =============== PAGES IMPORT =============== */
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>PrepPilot Home</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
