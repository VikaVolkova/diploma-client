import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { logout } from '../../features/auth/authSlice';
import { ROLES } from '../../helpers/constans';
import { ROUTES } from '../../helpers';

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
    navigate('/login');
  };
  const userNameFirstLetter = user?.name?.substr(0, 1).toUpperCase();
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Меню користувача">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
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
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {[ROLES.ADMIN, ROLES.MANAGER].includes(user?.role) && (
          <Link href={ROUTES.CREATE_ARTICLE} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NoteAddOutlinedIcon fontSize="small" />
              </ListItemIcon>
              {'Додати статтю'}
            </MenuItem>
          </Link>
        )}
        {[ROLES.ADMIN, ROLES.MANAGER].includes(user?.role) && (
          <Link href={ROUTES.UNPUBLISHED} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NewspaperOutlinedIcon fontSize="small" />
              </ListItemIcon>
              {'Неопубліковані статті'}
            </MenuItem>
          </Link>
        )}
        {[ROLES.ADMIN, ROLES.MANAGER].includes(user?.role) && (
          <Link href={ROUTES.UNPUBLISHED_COMMENTS} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NewspaperOutlinedIcon fontSize="small" />
              </ListItemIcon>
              {'Неопубліковані коментарі'}
            </MenuItem>
          </Link>
        )}
        {[ROLES.ADMIN].includes(user?.role) && (
          <Link href={ROUTES.CREATE_CATEGORY} underline="none">
            <MenuItem>
              <ListItemIcon>
                <AddBoxOutlinedIcon fontSize="small" />
              </ListItemIcon>
              {'Додати категорію'}
            </MenuItem>
          </Link>
        )}
        {[ROLES.ADMIN].includes(user?.role) && (
          <Link href={ROUTES.CREDENTIALS} underline="none">
            <MenuItem>
              <ListItemIcon>
                <NewspaperOutlinedIcon fontSize="small" />
              </ListItemIcon>
              {'Дані користувача'}
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
    </React.Fragment>
  );
};
