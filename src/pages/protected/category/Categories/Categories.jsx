import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ItemCategory } from '../../../../components/category/ItemCategory/ItemCategory';
import { getAllCategories } from '../../../../store/features/category/categoryMiddlewares';
import { filterData, getDeviceSize, ROUTES } from '../../../../helpers';
import { SearchBar } from '../../../../components/layout/SearchBar/SearchBar';
import AddIcon from '@mui/icons-material/Add';
import { List, Button, Typography, Container } from '@mui/material';
import s from './Categories.module.css';
import cn from 'classnames';

export const Categories = () => {
  const { allCategories } = useSelector((state) => state.category);
  const [searchQuery, setSearchQuery] = useState('');
  const { isPhone } = getDeviceSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const data = filterData(searchQuery, allCategories, 'category');

  return (
    <Container maxWidth={isPhone ? 'sm' : 'md'}>
      <div
        className={cn({
          [s.actionsBarPhone]: isPhone,
          [s.actionsBar]: !isPhone,
        })}
      >
        <SearchBar setSearchQuery={setSearchQuery} label="Пошук категорії" />

        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.CREATE_CATEGORY)}
          sx={{ mt: isPhone ? 2 : 0, width: isPhone ? '100%' : 'auto' }}
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
