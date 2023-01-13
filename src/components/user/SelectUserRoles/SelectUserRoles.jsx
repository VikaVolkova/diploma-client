import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormHelperText, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import { ConfirmDialog } from '../../notification/ConfirmDialog/ConfirmDialog';
import s from './SelectUserRoles.module.css';
import { ACTION, CONFIRM_MESSAGE, ROLES, SIZE_TYPES } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { toggleBlockUser, updateRole } from '../../../store/features/auth/authMiddlewares';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';

const getRoles = Object.values(ROLES);

export const SelectUserRoles = ({ userRole, email, updateUser, isBlocked }) => {
  const [role, setUserRole] = useState(userRole);
  const [action, setAction] = useState();
  const [block, setBlock] = useState(isBlocked);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleAlert = (actionType) => {
    setOpen((open) => !open);
    setAction(actionType);
  };

  const updateUserRole = (e) => {
    setUserRole(e.target.value);
  };

  const onSubmitUpdate = () => {
    dispatch(updateRole({ email, role }));
    updateUser(email, role);
  };

  const onSubmitBlock = () => {
    dispatch(toggleBlockUser({ email, isBlocked }));
    setBlock(!isBlocked);
  };

  return (
    <div className={s.container}>
      <div>
        <FormHelperText>Pоль:</FormHelperText>
        <Select className={s.select} value={role} onChange={updateUserRole} size={SIZE_TYPES.SMALL}>
          {getRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <Button type="button" onClick={() => toggleAlert('update')} variant="contained">
          оновити
        </Button>
        <Tooltip title={block ? ACTION.BLOCK : ACTION.UNBLOCK}>
          <IconButton
            color={block ? 'error' : 'primary'}
            onClick={() => toggleAlert('block')}
            aria-label={block ? ACTION.BLOCK : ACTION.UNBLOCK}
            component="label"
          >
            <BlockOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>

      <ConfirmDialog
        open={open}
        title={action === 'update' ? CONFIRM_MESSAGE.UPDATE_ROLE : CONFIRM_MESSAGE.BLOCK_USER}
        onClose={toggleAlert}
        handleConfirm={action === 'update' ? onSubmitUpdate : onSubmitBlock}
      />
    </div>
  );
};

SelectUserRoles.propTypes = {
  userRole: PropTypes.string,
  email: PropTypes.string,
  updateUser: PropTypes.func,
  isBlocked: PropTypes.bool,
};
