import React, { lazy, Suspense } from "react";
import DashboardLayout from "layouts/DashboardLayout";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

const Loadable =
  <C extends React.ComponentType<any>, P extends React.ComponentProps<C>>(Component: C) =>
  (props: P) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (
      <Suspense fallback={<></>}>
        <Component {...props} />
      </Suspense>
    );
  };

export default function Routes() {
  return useRoutes([
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="home" />,
        },
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "users",
          element: <UsersPage />,
        },
      ],
    },
  ]);
}

const HomePage = Loadable(lazy(() => import("pages/HomePage")));
const UsersPage = Loadable(lazy(() => import("pages/Users")));
