import { NavTabs, NavLink } from "./Tabs";

interface NavbarProps {}
export function Navbar(props: NavbarProps) {
  return (
    <NavTabs>
      <NavLink href="/dashboard" label="Events" />
      <NavLink href="/dashboard/table" label="Table" />
      <NavLink href="/dashboard" label="Players" />
      <NavLink href="/dashboard" label="Competitions" />
    </NavTabs>
  );
}
