import {
  AccountTreeOutlined,
  type SvgIconComponent,
} from "@mui/icons-material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export interface SidebarItems {
  label: string;
  icon: SvgIconComponent;
  path: string;
}

export const SidebarItems: SidebarItems[] = [
  { label: "Dashboard", icon: DashboardOutlinedIcon, path: "/" },
  { label: "Products", icon: AccountTreeOutlined, path: "/products" },
  { label: "Sales", icon: MonetizationOnOutlinedIcon, path: "/sales" },
  { label: "Inventory", icon: Inventory2OutlinedIcon, path: "/inventory" },
];
