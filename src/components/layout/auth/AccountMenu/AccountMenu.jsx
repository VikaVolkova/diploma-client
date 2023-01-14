import React, { useState } from 'react';
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
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { logout } from '../../../../store/features/auth/authSlice';
import { ROUTES, ROLES, paperProps, SIZE_TYPES } from '../../../../helpers';
import { useNavigate } from 'react-router-dom';
import { checkRole } from '../../../../helpers/helpers';
import { anchorOrigin, avatar, transformOrigin } from './AccountMenu.helpers';

export const AccountMenu = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  const [anchorEl, setAnchorEl] = useState(null);
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
          <IconButton onClick={handleClick}>
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
                <NoteAddOutlinedIcon fontSize={SIZE_TYPES.SMALL} />
              </ListItemIcon>
              Додати статтю
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN, ROLES.MANAGER], user) && (
          <Link href={ROUTES.UNPUBLISHED} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NewspaperOutlinedIcon fontSize={SIZE_TYPES.SMALL} />
              </ListItemIcon>
              Неопубліковані статті
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN, ROLES.MANAGER], user) && (
          <Link href={ROUTES.UNPUBLISHED_COMMENTS} underline="none">
            <MenuItem>
              <ListItemIcon>
                <FeedbackOutlinedIcon fontSize={SIZE_TYPES.SMALL} />
              </ListItemIcon>
              Неопубліковані коментарі
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN], user) && (
          <Link href={ROUTES.EDIT_CATEGORIES} underline="none">
            <MenuItem>
              <ListItemIcon>
                <CategoryOutlinedIcon fontSize={SIZE_TYPES.SMALL} />
              </ListItemIcon>
              Kатегорії
            </MenuItem>
          </Link>
        )}
        {checkRole([ROLES.ADMIN], user) && (
          <Link href={ROUTES.UPDATE_ROLE} underline="none">
            <MenuItem>
              <ListItemIcon>
                <ManageAccountsOutlinedIcon fontSize={SIZE_TYPES.SMALL} />
              </ListItemIcon>
              Користувачі
            </MenuItem>
          </Link>
        )}

        <Divider />

        <Link href={ROUTES.USER} underline="none">
          <MenuItem>
            <ListItemIcon>
              <AccountCircleOutlinedIcon fontSize={SIZE_TYPES.SMALL} />
            </ListItemIcon>
            Мій профіль
          </MenuItem>
        </Link>

        <Link underline="none" onClick={() => handleSignOut()}>
          <MenuItem>
            <ListItemIcon>
              <LogoutIcon fontSize={SIZE_TYPES.SMALL} />
            </ListItemIcon>
            Вийти
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
};
