import { Button, IconButton, ImageList, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../store/features/category/categoryMiddlewares';
import s from './CategoriesList.module.css';
import cn from 'classnames';
import { ACTION, getDeviceSize, SIZE_TYPES } from '../../../helpers';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { iconBtnStyle, imageListStyle, selectContainerClass } from './CategoriesList.helpers';
import { useState } from 'react';

export const CategoriesList = ({ isOpened, close }) => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLaptop } = getDeviceSize();
  const containerClass = selectContainerClass(isLaptop);
  const btnSize = isLaptop ? SIZE_TYPES.SMALL : SIZE_TYPES.LARGE;

  useEffect(() => {
    dispatch(getCategories()).then((res) => {
      setCategories(res.payload);
    });
  }, []);

  const openCategoryPage = (url) => {
    navigate(url);
    close();
  };

  return (
    isOpened && (
      <>
        <div className={cn(s.categoriesContainer, s[containerClass])}>
          <Tooltip title={ACTION.CLOSE}>
            <IconButton aria-label={ACTION.CLOSE} onClick={close} sx={iconBtnStyle}>
              <ArrowBackOutlinedIcon />
            </IconButton>
          </Tooltip>
          <ImageList cols={1} gap={20} variant="standard" sx={imageListStyle}>
            {categories.map((category) => (
              <Button
                key={category._id}
                variant="text"
                size={btnSize}
                onClick={() => openCategoryPage(category.url)}
                sx={{ font: '600 var(--sm-font-size) "Open Sans"' }}
              >
                {category.name}
              </Button>
            ))}
          </ImageList>
        </div>
      </>
    )
  );
};

CategoriesList.propTypes = {
  isOpened: PropTypes.bool,
  close: PropTypes.func,
};
