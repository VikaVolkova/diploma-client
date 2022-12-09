import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import { Container } from '../Container/Container';
import s from './Header.module.css';
import { navigation } from '../../helpers';

export const Header = () => {
  const navigationList = Object.values(navigation);
  return (
    <header>
      <Container>
        <div className={s.container}>
          <Logo />
          <Navigation navigationList={navigationList} />
        </div>
      </Container>
    </header>
  );
};

Header.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};
