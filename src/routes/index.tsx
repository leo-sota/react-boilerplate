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
        /* PAGE_ROUTER */
{
          path: "users",
          children: [
            {
              path: "create",
              element: <UsersForm />,
            },
            {
              path: ":id/edit",
              element: <UsersForm />,
            },
            {
              index: true,
              element: <UsersPage />,
            },
          ],
        },

        {
          path: "home",
          element: <HomePage />,
        },
      ],
    },
  ]);
}

/* COMPONENT_GENERATOR_PAGE_IMPORT */
const UsersPage = Loadable(lazy(() => import("pages/dashboard/Users")));
const HomePage = Loadable(lazy(() => import("pages/dashboard/HomePage")));

/* COMPONENT_GENERATOR_FEATURES_IMPORT */
const UsersForm = Loadable(lazy(() => import("features/users/UsersForm")));
