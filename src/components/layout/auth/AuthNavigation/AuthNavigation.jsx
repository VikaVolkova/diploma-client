import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './AuthNavigation.module.css';
import { AccountMenu } from '../AccountMenu/AccountMenu';
import { useSelector } from 'react-redux';
import { ROUTES, getDeviceSize } from '../../../../helpers';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from 'react';

export const AuthNavigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { isTablet } = getDeviceSize();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {userInfo ? (
        <AccountMenu />
      ) : !isTablet ? (
        <>
          <NavLink
            to={ROUTES.LOGIN}
            className={({ isActive }) =>
              cn(s.authLink, {
                [s.authLinkActive]: isActive,
              })
            }
          >
            Зайти
          </NavLink>

          <NavLink
            to={ROUTES.REGISTER}
            className={({ isActive }) =>
              cn(s.authLink, {
                [s.authLinkActive]: isActive,
              })
            }
          >
            Зареєструватись
          </NavLink>
        </>
      ) : (
        <div>
          <IconButton
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem>
              <NavLink to={ROUTES.LOGIN} className={s.authLink} onClick={handleClose}>
                Зайти
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={ROUTES.REGISTER} className={s.authLink} onClick={handleClose}>
                Зареєструватись
              </NavLink>
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};
