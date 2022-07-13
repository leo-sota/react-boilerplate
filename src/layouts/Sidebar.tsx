import sidebarConfig from "./sidebarConfig";
import NavSection from "./NavSection";

interface SidebarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
}
// ----------------------------------------------------------------------

export default function Sidebar() {
  return (
    <div className="shrink-0 w-258 bg-amber-500 h-screen fixed top-0 left-0">
      <NavSection navConfig={sidebarConfig} isShow={true} />
    </div>
  );
}
