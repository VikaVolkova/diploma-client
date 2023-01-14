import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem, ListItemText, Box } from '@mui/material';
import { SelectUserRoles } from '../SelectUserRoles/SelectUserRoles';

import s from './ItemUserRole.module.css';
import { getDeviceSize, listStyle } from '../../../helpers';
import { avatarStyle, boxStyle, listStylePhone } from './ItemUserRole.helpers';

export const ItemUserRole = ({ user, updateUser }) => {
  const { email, role, name, isBlocked, image } = user;
  const { isPhone } = getDeviceSize();
  const listItemStyle = isPhone ? listStylePhone : listStyle;

  return (
    <>
      <ListItem sx={listItemStyle}>
        <div className={s.sectionAvatar}>
          <Avatar sx={avatarStyle} src={image} />
          <Box sx={boxStyle}>
            <ListItemText primary={name} secondary={`E-mail: ${email}`} />
          </Box>
        </div>
        <SelectUserRoles
          email={email}
          userRole={role}
          updateUser={updateUser}
          isBlocked={!isBlocked}
        />
      </ListItem>
    </>
  );
};

ItemUserRole.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    isBlocked: PropTypes.bool,
  }),
  updateUser: PropTypes.func,
};
