import React from 'react';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import { Container } from '../../../layout/Container/Container';
import s from './Header.module.css';
import { categoriesButton, navigation } from '../../../../helpers';
import { CategoriesList } from '../CategoriesList/CategoriesList';
import { Typography } from '@mui/material';
import { useState } from 'react';

export const Header = () => {
  const navigationList = Object.values(navigation);
  const [openCategories, setOpenCategories] = useState(false);

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  const closeCategories = () => {
    setOpenCategories(false);
  };

  return (
    <header>
      <Container>
        <div className={s.container}>
          <Logo />
          <div className={s.navigation}>
            <Typography onClick={toggleCategories} size="small" sx={categoriesButton} type="text">
              Всі категорії
            </Typography>
            <Navigation navigationList={navigationList} />
          </div>
        </div>
        <CategoriesList isOpened={openCategories} close={closeCategories} />
      </Container>
    </header>
  );
};
