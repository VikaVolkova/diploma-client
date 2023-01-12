import React from 'react';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import { Container } from '../../../layout/Container/Container';
import s from './Header.module.css';
import { getCategoriesButton, getDeviceSize, navigation } from '../../../../helpers';
import { CategoriesList } from '../../../category/CategoriesList/CategoriesList';
import { Typography } from '@mui/material';
import { useState } from 'react';

export const Header = () => {
  const navigationList = Object.values(navigation);
  const [openCategories, setOpenCategories] = useState(false);

  const { isLaptop, isTablet } = getDeviceSize();
  const categoriesButton = getCategoriesButton(isLaptop);

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  const closeCategories = () => {
    setOpenCategories(false);
  };

  return (
    <header className={s.header}>
      <Container>
        <div className={s.container}>
          <Logo />
          <div className={s.navigation}>
            {!isTablet && (
              <Typography
                onClick={toggleCategories}
                variant={isLaptop ? 'body1' : 'h6'}
                sx={categoriesButton}
                type="text"
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
    </header>
  );
};
