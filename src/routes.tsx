// import React from 'react'
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import AuthGuard from "./guards/AuthGuard";
import JokesPage from "./pages/JokesPage";
import JokeCreateUpdate from "./pages/JokeCreateUpdate";

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
    {
      path:'joke/new',
      element:(
        <AuthGuard>
          <JokeCreateUpdate />
        </AuthGuard>
      )
    },
    {
      path:'joke/:id/edit',
      element:(
        <AuthGuard>
          <JokeCreateUpdate />
        </AuthGuard>
      )
    },
  ]);
  
  return routes;
}
