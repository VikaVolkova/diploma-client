import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormHelperText, Select, MenuItem } from '@mui/material';
import { ConfirmDialog } from '../../notification/ConfirmDialog/ConfirmDialog';
import s from './SelectUserRoles.module.css';
import { CONFIRM_MESSAGE, ROLES } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { updateRole } from '../../../store/features/auth/authMiddlewares';

const getRoles = Object.values(ROLES);

export const SelectUserRoles = ({ userRole, email, updateUser }) => {
  const [role, setUserRole] = useState(userRole);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleAlert = () => {
    setOpen((open) => !open);
  };

  const updateUserRole = (e) => {
    setUserRole(e.target.value);
  };

  const onSubmit = () => {
    dispatch(updateRole({ email, role }));
    updateUser(email, role);
  };

  return (
    <div className={s.container}>
      <div>
        <FormHelperText>Нова роль:</FormHelperText>
        <Select className={s.select} value={role} onChange={updateUserRole} size="small">
          {getRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <Button type="button" onClick={toggleAlert} variant="contained">
          оновити
        </Button>
      </div>

      <ConfirmDialog
        open={open}
        title={CONFIRM_MESSAGE.UPDATE_ROLE}
        onClose={toggleAlert}
        handleConfirm={onSubmit}
      />
    </div>
  );
};

SelectUserRoles.propTypes = {
  userRole: PropTypes.string,
  email: PropTypes.string,
  updateUser: PropTypes.func,
};
