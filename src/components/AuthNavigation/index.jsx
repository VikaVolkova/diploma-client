import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import useAuth from "../../useAuth";
import s from "./index.module.css";
import AccountMenu from "../AccountMenu";

function AuthNavigation() {
  const { user } = useAuth();
  return (
    <div className={s.authContainer}>
      {user ? (
        <AccountMenu />
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              cn(s.authLink, {
                [s.authLinkActive]: isActive,
              })
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              cn(s.authLink, {
                [s.authLinkActive]: isActive,
              })
            }
          >
            Register
          </NavLink>
        </>
      )}
    </div>
  );
}

export default AuthNavigation;
