function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

export const PATH_DASHBOARD = {
  home: path(ROOTS_DASHBOARD, "/home"),
  users: path(ROOTS_DASHBOARD, "/users"),
};
