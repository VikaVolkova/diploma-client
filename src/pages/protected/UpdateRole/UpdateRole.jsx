import React, { useState, useEffect } from 'react';
import { ItemUserRole } from '../../../components/user/ItemUserRole/ItemUserRole';
import { List, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../../store/features/auth/authMiddlewares';

export const UpdateRole = () => {
  const [usersArr, setUsersArr] = useState([]);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setUsersArr(users);
    }
  }, [users]);

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
      <List>
        {usersArr.map((user) => (
          <ItemUserRole key={user._id} user={user} updateUser={updateRole} />
        ))}
      </List>
    </Container>
  );
};