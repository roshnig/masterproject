import { type FC, createElement } from "react";
import { IcNavigationItem, IcSideNavigation, SlottedSVG } from "@ukic/react";

import LightModeIcon from "@mui/icons-material/LightMode";
import { Avatar, Box, Toolbar } from "@mui/material";

import { SidebarItems } from "./SidebarItems";
import styles from "./IcSidebar.module.scss";
import { Outlet, useNavigate } from "react-router";

const SideNavigation: FC = () => {
  const navigate = useNavigate();
  return (
    <IcSideNavigation
      appTitle='ACME coffee shop'
      //   version='v0.0.7'
      //   status='Alpha'
      className={styles.icNav}
    >
      <img
        src='./org-logo.jpg'
        alt='org logo'
        width='36px'
        height='auto'
        slot='app-icon'
      />
      {SidebarItems.map((item) => (
        <IcNavigationItem
          slot='primary-navigation'
          onClick={() => navigate(item.path)}
          label={item.label}
          key={item.path}
          className={styles.icNavItem}
        >
          <SlottedSVG slot='icon' viewBox='0 0 24 24'>
            {createElement(item.icon)}
          </SlottedSVG>
        </IcNavigationItem>
      ))}

      <IcNavigationItem
        slot='secondary-navigation'
        label='Theme'
        className={styles.icNavSecItem}
      >
        <SlottedSVG slot='icon' viewBox='0 0 24 24'>
          <LightModeIcon />
        </SlottedSVG>
      </IcNavigationItem>

      <IcNavigationItem
        slot='secondary-navigation'
        label='User'
        className={styles.icNavSecItem}
      >
        <div slot='icon'>
          <Avatar
            aria-label='User Image'
            src='/user.jpg'
            sx={{ width: "26px", height: "26px" }}
          />
        </div>
      </IcNavigationItem>
    </IcSideNavigation>
  );
};
export default SideNavigation;

//we are returning layout itself which contains above sidebar
// export default function ICSidebar() {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideNavigation />
//       <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }
