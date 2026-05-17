/* =============== BROWSER ROTUER IMPORT =============== */
import { createBrowserRouter } from "react-router";

/* =============== PAGES IMPORT =============== */
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <h1>PrepPilot Home</h1>
      </Protected>
    ),
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
