import { PATH_DASHBOARD } from "routes/path";

export type SidebarItem = {
  title: string;
  path: string;
  icon: JSX.Element;
  children?: { title: string; path: string; icon: string }[];
  info?: any;
};

export interface SidebarConfig {
  subheader: string;
  items: SidebarItem[];
}

const sidebarConfig: SidebarConfig[] = [
  {
    subheader: " ",
    items: [
      /* SIDEBAR_ELEMENT_GENERATOR */
{
            title: "Users",
            path: PATH_DASHBOARD.users,
            icon: <></>,
          },
      {
        title: "Home",
        path: PATH_DASHBOARD.home,
        icon: <></>,
      },
    ],
  },
];

export default sidebarConfig;
