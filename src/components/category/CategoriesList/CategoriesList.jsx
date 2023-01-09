import { Button, ImageList } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../store/features/category/categoryMiddlewares';

export const CategoriesList = ({ isOpened, close }) => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const openCategoryPage = (url) => {
    navigate(url);
    close();
  };

  return (
    isOpened && (
      <ImageList cols={9} gap={30} variant="standard">
        {categories.map((category) => (
          <Button
            key={category._id}
            variant="contained"
            onClick={() => openCategoryPage(category.url)}
          >
            {category.category}
          </Button>
        ))}
      </ImageList>
    )
  );
};

CategoriesList.propTypes = {
  isOpened: PropTypes.bool,
  close: PropTypes.func,
};
