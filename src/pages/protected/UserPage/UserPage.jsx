import React from 'react';
import { Container } from '../../../components/layout/Container/Container';
import { useSelector } from 'react-redux';
import { UserCard } from '../../../components/user/UserCard/UserCard';
import { Box, CircularProgress } from '@mui/material';

export const UserPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

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
