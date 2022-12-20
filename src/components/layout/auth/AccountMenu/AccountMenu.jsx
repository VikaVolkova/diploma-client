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
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { logout } from '../../../../store/features/auth/authSlice';
import { ROUTES, ROLES, paperProps } from '../../../../helpers';
import { useNavigate } from 'react-router-dom';
import { checkRole } from '../../../../helpers/helpers';
import { anchorOrigin, avatar, transformOrigin } from './AccountMenu.helpers';

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
  return (
    <>
      <Box>
        <Tooltip title="Меню користувача">
          <IconButton onClick={handleClick} sx={{ ml: 2 }}>
            <Avatar sx={avatar} src={user.image} />
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
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
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
        <Link href={ROUTES.USER} underline="none">
          <MenuItem>
            <ListItemIcon>
              <AccountCircleOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Мій профіль
          </MenuItem>
        </Link>

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
