import { React, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from '../Navigation/Navigation.module.css';
import { useSelector } from 'react-redux';

export const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { categories } = useSelector((state) => state.category);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
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
        {categories.map(({ name, url, id }) => (
          <MenuItem key={`${name}-${id}`}>
            <NavLink
              className={({ isActive }) =>
                cn(s.navItemLink, s.navItemSmall, { [s.navItemActive]: isActive })
              }
              to={('/', url)}
              onClick={handleClose}
            >
              {name}
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
