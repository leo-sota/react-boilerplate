import { NavLink as RouterLink, useLocation } from "react-router-dom";

import { SidebarConfig, SidebarItem } from "./sidebarConfig";

// ----------------------------------------------------------------------
interface NavSectionProps {
  navConfig: SidebarConfig[];
  isShow?: boolean;
  [X: string]: any;
}

function NavItem({ item, isShow }: { item: SidebarItem; isShow: boolean }) {
  const { pathname } = useLocation();
  const { title, path, icon, info } = item;
  const isActiveRoot = path ? pathname.indexOf(path) !== -1 : false;

  return (
    <RouterLink to={path}>
      <div className="w-6 flex justify-center items-center">{icon && icon}</div>
      {isShow && (
        <>
          <p className={`px-4 py-2 ${isActiveRoot ? "text-white font-bold bg-blue-900" : ""}`}>
            {title}
          </p>
          {info && info}
        </>
      )}
    </RouterLink>
  );
}

export default function NavSection({ navConfig, isShow = true, ...other }: NavSectionProps) {
  return (
    <div {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <ul key={subheader} className="py-5">
            {isShow && <li>{subheader}</li>}
            {items.map((item) => (
              <NavItem key={item.title} item={item} isShow={isShow} />
            ))}
          </ul>
        );
      })}
    </div>
  );
}
