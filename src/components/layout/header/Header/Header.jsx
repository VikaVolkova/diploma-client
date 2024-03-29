import React, { useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import s from './Header.module.css';
import {
  categoriesButton,
  getDeviceSize,
  navigation,
  TYPOGRAPHY_VARIANTS,
} from '../../../../helpers';
import { CategoriesList } from '../../../category/CategoriesList/CategoriesList';
import { Container, LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const Header = () => {
  const navigationList = Object.values(navigation);
  const [openCategories, setOpenCategories] = useState(false);

  const { isTablet } = getDeviceSize();

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  const closeCategories = () => {
    setOpenCategories(false);
  };
  const { loadingArticles: isLoading } = useSelector((state) => state.article);

  return (
    <>
      <header className={s.header}>
        <Container>
          <div className={s.container}>
            <Logo />
            <div className={s.navigation}>
              {!isTablet && (
                <Typography
                  onClick={toggleCategories}
                  variant={TYPOGRAPHY_VARIANTS.BODY1}
                  sx={categoriesButton}
                >
                  Всі категорії
                </Typography>
              )}
              <Navigation navigationList={navigationList} />
            </div>
          </div>
          <CategoriesList
            isOpened={openCategories}
            close={closeCategories}
            toggleCategories={toggleCategories}
          />
        </Container>
        {isLoading && <LinearProgress />}
      </header>

      <div className={s.headerLayout} />
    </>
  );
};
