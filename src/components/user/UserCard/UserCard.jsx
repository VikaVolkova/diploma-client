import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Typography } from '@mui/material';
import s from './UserCard.module.css';
import { button, getAvatarStyle, getButtonSize } from './UserCard.helpers';
import PropTypes from 'prop-types';
import { ActionPanel } from '../../article/ActionPanel/ActionPanel';
import { BUTTON_VARIANT, getDeviceSize, ROUTES, TYPOGRAPHY_VARIANTS } from '../../../helpers';
import cn from 'classnames';
import { deleteUser } from '../../../store/features/auth/authMiddlewares';

export const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isTablet, isPhone } = getDeviceSize();

  const avatarStyle = getAvatarStyle(isPhone);
  const buttonSize = getButtonSize(isTablet);

  const updatePassword = () => {
    navigate(ROUTES.UPDATE_PASSWORD);
  };

  const removeUser = () => {
    dispatch(deleteUser());
    navigate(ROUTES.LOGIN);
  };

  return (
    <div
      className={cn(s.navItemLink, { [s.container]: !isPhone }, { [s.containerPhone]: isPhone })}
    >
      <div className={s.image}>
        <Avatar sx={avatarStyle} src={user.image} />
      </div>
      <div className={s.userData}>
        <Typography variant={TYPOGRAPHY_VARIANTS.SUBTITLE1}>{`Ім'я: ${user.name}`}</Typography>
        <Typography variant={TYPOGRAPHY_VARIANTS.SUBTITLE1}>{`E-mail: ${user.email}`}</Typography>
        <div className={s.buttons}>
          {!user.googleUser && (
            <Button
              variant={BUTTON_VARIANT.CONTAINED}
              size={buttonSize}
              sx={button}
              onClick={() => updatePassword()}
            >
              Оновити пароль
            </Button>
          )}
          <ActionPanel
            handleEdit={() => navigate(ROUTES.UPDATE_USER)}
            handleDelete={() => removeUser()}
          />
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    googleUser: PropTypes.bool,
  }).isRequired,
};
