import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import s from "./index.module.css";
// import AuthNavigation from "../AuthNavigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MobileMenu from "../MobileMenu";

function Navigation({ navigationList }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {isDesktop ? (
        <nav className={s.navContainer}>
          <ul className={s.navList}>
            {navigationList.map(({ label, url, id }) => (
              <li className={s.navItem} key={`${label}-${id}`}>
                <NavLink
                  className={({ isActive }) =>
                    cn(s.navItemLink, { [s.navItemActive]: isActive })
                  }
                  to={("/", url)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* <AuthNavigation /> */}
        </nav>
      ) : (
        <MobileMenu />
      )}
    </>
  );
}

Navigation.propTypes = {
  navigationList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
};

export default Navigation;
