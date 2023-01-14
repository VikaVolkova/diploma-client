import React, { useState, useEffect } from 'react';
import { ItemUserRole } from '../../../../components/user/ItemUserRole/ItemUserRole';
import { List, Container, Box, CircularProgress, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../../../store/features/auth/authMiddlewares';
import { SearchBar } from '../../../../components/layout/SearchBar/SearchBar';
import { filterData, loadingBoxStyle } from '../../../../helpers';

export const Users = () => {
  const [usersArr, setUsersArr] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setUsersArr(users);
    }
  }, [users]);

  loading && (
    <Box sx={loadingBoxStyle}>
      <CircularProgress />
    </Box>
  );

  const data = filterData(searchQuery, usersArr, 'user');

  const updateRole = (userId, newRole) => {
    setUsersArr((prevState) =>
      prevState.map((item) => {
        if (item._id === userId) {
          return { ...item, role: newRole };
        }
        return item;
      }),
    );
  };

  return (
    <Container maxWidth="md">
      <SearchBar setSearchQuery={setSearchQuery} label="Користувач" />
      {data.length > 0 ? (
        <List>
          {data.map((user) => (
            <ItemUserRole key={user._id} user={user} updateUser={updateRole} />
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Користувачів не знайдено
        </Typography>
      )}
    </Container>
  );
};
