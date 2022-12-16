import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem, ListItemText, Box } from '@mui/material';
import { SelectUserRoles } from '../SelectUserRoles/SelectUserRoles';

import s from './ItemUserRole.module.css';

export const ItemUserRole = ({ user, updateUser }) => {
  const { email, role, name } = user;

  return (
    <>
      <ListItem sx={{ justifyContent: 'space-between', borderBottom: '1px solid black ' }}>
        <div className={s.sectionAvatar}>
          <Avatar sx={{ width: 32, height: 32 }} />
          <Box sx={{ display: 'flex', ml: '25px' }}>
            <ListItemText primary={name} secondary={`Роль: ${role}`} />
          </Box>
        </div>
        <SelectUserRoles email={email} userRole={role} updateUser={updateUser} />
      </ListItem>
    </>
  );
};

ItemUserRole.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
  updateUser: PropTypes.func,
};
