import React from 'react';
import { Container } from '../../../components/layout/Container/Container';
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from '../../../components/user/UserCard/UserCard';
import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { getUser } from '../../../store/features/auth/authMiddlewares';

export const UserPage = () => {
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser({ accessToken }));
  }, [accessToken]);

  if (!userInfo) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    userInfo && (
      <Container>
        <UserCard user={userInfo} />
      </Container>
    )
  );
};
