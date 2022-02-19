import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface NavLinkProps {
  label?: string;
  href?: string;
}
export function NavLink(props: NavLinkProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

interface NavTabsProps extends TabsProps {}
export function NavTabs(props: NavTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} {...props} />
    </Box>
  );
}
