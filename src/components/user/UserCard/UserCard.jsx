import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import s from './UserCard.module.css';
import { avatar, button } from './UserCard.helpers';
import PropTypes from 'prop-types';
import { ActionPanel } from '../../article/ActionPanel/ActionPanel';
import { ROUTES } from '../../../helpers';

export const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const updatePassword = () => {
    navigate(ROUTES.UPDATE_PASSWORD);
  };

  return (
    <div className={s.container}>
      <div className={s.image}>
        <Avatar sx={avatar} src={user.image} />
      </div>
      <div className={s.userData}>
        <Typography variant="h6">{`Ім'я: ${user.name}`}</Typography>
        <Typography variant="h6">{`E-mail: ${user.email}`}</Typography>
        <div className={s.buttons}>
          <Button variant="contained" sx={button} onClick={() => updatePassword()}>
            Оновити пароль
          </Button>
          <ActionPanel
            handleEdit={() => navigate(ROUTES.UPDATE_USER)}
            handleDelete={() => console.log('remove')}
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
  }).isRequired,
};
