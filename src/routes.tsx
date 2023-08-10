// import React from 'react'
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import AuthGuard from "./guards/AuthGuard";
import JokesPage from "./pages/JokesPage";

export default function Router() {
  const routes = useRoutes([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <JokesPage />
        </AuthGuard>
      ),
    },
  ]);
  
  return routes;
}
