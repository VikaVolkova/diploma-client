import React from 'react';
import { Container } from '../../../../components/layout/Container/Container';
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from '../../../../components/user/UserCard/UserCard';
import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { getUser } from '../../../../store/features/auth/authMiddlewares';
import { loadingBoxStyle } from '../../../../helpers';

export const UserPage = () => {
  const { userInfo, accessToken, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser({ accessToken }));
  }, [accessToken]);

  loading && (
    <Box sx={loadingBoxStyle}>
      <CircularProgress />
    </Box>
  );

  return (
    userInfo && (
      <Container>
        <UserCard user={userInfo} />
      </Container>
    )
  );
};
