import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './Navigation.module.css';
import { AuthNavigation } from '../../auth/AuthNavigation/AuthNavigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { IconButton, Tooltip } from '@mui/material';
import { ACTION } from '../../../../helpers';
import SearchIcon from '@mui/icons-material/Search';
import { SearchArticleModal } from '../../../article/SearchArticleModal/SearchArticleModal';
import { useSelector } from 'react-redux';

export const Navigation = ({ navigationList }) => {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isOpen, setIsOpen] = useState(false);

  const { articles } = useSelector((state) => state.article);

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      {isDesktop ? (
        <>
          <nav className={s.navContainer}>
            <ul className={s.navList}>
              {navigationList.map(({ label, url, id }) => (
                <li className={s.navItem} key={`${label}-${id}`}>
                  <NavLink
                    className={({ isActive }) => cn(s.navItemLink, { [s.navItemActive]: isActive })}
                    to={('/', url)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Tooltip title={ACTION.SEARCH}>
              <IconButton
                aria-label={ACTION.SEARCH}
                size="medium"
                onClick={handleOpen}
                sx={{ ml: 2 }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <AuthNavigation />
          </nav>
          {articles && <SearchArticleModal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
      ) : (
        <MobileMenu />
      )}
    </>
  );
};

Navigation.propTypes = {
  navigationList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};
