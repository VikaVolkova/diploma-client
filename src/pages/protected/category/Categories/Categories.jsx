import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ItemCategory } from '../../../../components/category/ItemCategory/ItemCategory';
import { getAllCategories } from '../../../../store/features/category/categoryMiddlewares';
import { filterData, ROUTES } from '../../../../helpers';
import { SearchBar } from '../../../../components/layout/SearchBar/SearchBar';
import AddIcon from '@mui/icons-material/Add';
import { List, Container, Button, Typography } from '@mui/material';
import s from './Categories.module.css';

export const Categories = () => {
  const { allCategories } = useSelector((state) => state.category);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const data = filterData(searchQuery, allCategories, 'category');

  return (
    <Container maxWidth="md">
      <div className={s.actionsBar}>
        <SearchBar setSearchQuery={setSearchQuery} label="Пошук категорії" />
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.CREATE_CATEGORY)}
        >
          Додати категорію
        </Button>
      </div>
      {data.length > 0 ? (
        <List>
          {data.map((category) => (
            <ItemCategory category={category} key={category._id} />
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Категорії не знайдено
        </Typography>
      )}
    </Container>
  );
};
