import { List, Container, Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ItemCategory } from '../../../components/category/ItemCategory/ItemCategory';
import { getCategories } from '../../../store/features/category/categoryMiddlewares';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../helpers';

export const UpdateCategories = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories({ isActive: false }));
  }, []);
  return (
    <Container maxWidth="md">
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        onClick={() => navigate(ROUTES.CREATE_CATEGORY)}
      >
        Додати категорію
      </Button>
      <List>
        {categories.map((category) => (
          <ItemCategory category={category} key={category._id} />
        ))}
      </List>
    </Container>
  );
};
