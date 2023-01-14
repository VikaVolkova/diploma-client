import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormHelperText, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import { ConfirmDialog } from '../../notification/ConfirmDialog/ConfirmDialog';
import s from './SelectUserRoles.module.css';
import {
  ACTION,
  BUTTON_TYPE,
  BUTTON_VARIANT,
  CONFIRM_MESSAGE,
  getDeviceSize,
  ROLES,
  SIZE_TYPES,
} from '../../../helpers';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { toggleBlockUser, updateRole } from '../../../store/features/auth/authMiddlewares';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ACTION_TYPE } from './SelectUserRoles.helpers';

const getRoles = Object.values(ROLES);

export const SelectUserRoles = ({ userRole, email, updateUser, isBlocked }) => {
  const [role, setUserRole] = useState(userRole);
  const [action, setAction] = useState();
  const [block, setBlock] = useState(isBlocked);
  const [isUpdated, setIsUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const { isTablet, isPhone } = getDeviceSize();
  const dispatch = useDispatch();

  const toggleAlert = (actionType) => {
    setOpen((open) => !open);
    setAction(actionType);
  };

  const updateUserRole = (e) => {
    setUserRole(e.target.value);
    setIsUpdated(true);
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
    <div className={cn(s.container, { [s.small]: isPhone })}>
      <div>
        <FormHelperText>Pоль:</FormHelperText>
        <Select
          className={s.select}
          value={role}
          onChange={updateUserRole}
          size={SIZE_TYPES.SMALL}
          sx={{ fontSize: isTablet ? 14 : 20 }}
        >
          {getRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        {isPhone ? (
          <IconButton
            color="success"
            onClick={() => toggleAlert(ACTION_TYPE.UPDATE)}
            aria-label={block ? ACTION.BLOCK : ACTION.UNBLOCK}
            component="label"
            disabled={!isUpdated}
          >
            <CheckOutlinedIcon />
          </IconButton>
        ) : (
          <Button
            type={BUTTON_TYPE.BUTTON}
            onClick={() => toggleAlert(ACTION_TYPE.UPDATE)}
            variant={BUTTON_VARIANT.CONTAINED}
          >
            оновити
          </Button>
        )}
        <Tooltip title={block ? ACTION.BLOCK : ACTION.UNBLOCK}>
          <IconButton
            color={block ? 'error' : 'primary'}
            onClick={() => toggleAlert(ACTION_TYPE.BLOCK)}
            aria-label={block ? ACTION.BLOCK : ACTION.UNBLOCK}
            component="label"
          >
            <BlockOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>

      <ConfirmDialog
        open={open}
        title={
          action === ACTION_TYPE.UPDATE ? CONFIRM_MESSAGE.UPDATE_ROLE : CONFIRM_MESSAGE.BLOCK_USER
        }
        onClose={toggleAlert}
        handleConfirm={action === ACTION_TYPE.UPDATE ? onSubmitUpdate : onSubmitBlock}
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
