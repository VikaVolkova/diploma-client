import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './AuthNavigation.module.css';
import { AccountMenu } from '../AccountMenu/AccountMenu';
import { useSelector } from 'react-redux';

export const AuthNavigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className={s.authContainer}>
      {userInfo ? (
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
            Зайти
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              cn(s.authLink, {
                [s.authLinkActive]: isActive,
              })
            }
          >
            Зареєструватись
          </NavLink>
        </>
      )}
    </div>
  );
};
