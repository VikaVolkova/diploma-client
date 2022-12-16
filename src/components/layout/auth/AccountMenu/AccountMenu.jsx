import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  Box,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../../../store/features/auth/authSlice';
import { ROUTES, ROLES, paperProps } from '../../../../helpers';
import { useNavigate } from 'react-router-dom';
import { checkRole } from '../../../../helpers/helpers';

export const AccountMenu = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    dispatch(logout(null));
    navigate(ROUTES.LOGIN);
  };
  const userNameFirstLetter = user?.name?.substr(0, 1).toUpperCase();
  return (
    <>
      <Box>
        <Tooltip title="Меню користувача">
          <IconButton onClick={handleClick} sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>{userNameFirstLetter}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {checkRole([ROLES.ADMIN, ROLES.MANAGER], user) && (
          <Link href={ROUTES.CREATE_ARTICLE} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NoteAddOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Додати статтю
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN, ROLES.MANAGER], user) && (
          <Link href={ROUTES.UNPUBLISHED} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NewspaperOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Неопубліковані статті
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN, ROLES.MANAGER], user) && (
          <Link href={ROUTES.UNPUBLISHED_COMMENTS} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NewspaperOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Неопубліковані коментарі
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN], user) && (
          <Link href={ROUTES.CREATE_CATEGORY} underline="none">
            <MenuItem>
              <ListItemIcon>
                <AddBoxOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Додати категорію
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN], user) && (
          <Link href={ROUTES.CREDENTIALS} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NewspaperOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Дані користувача
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN], user) && (
          <Link href={ROUTES.UPDATE_ROLE} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NewspaperOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Оновити ролі користувачів
            </MenuItem>
          </Link>
        )}

        <Divider />
        <Link underline="none" component="button" variant="body1" onClick={() => handleSignOut()}>
          <MenuItem>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Вийти
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
