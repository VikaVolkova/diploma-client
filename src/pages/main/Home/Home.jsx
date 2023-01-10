import React from 'react';
import { Container } from '../../../components/layout/Container/Container';
import { ArticleList } from '../../../components/article/ArticleList/ArticleList';
import { PAGE_TYPE } from '../../../helpers';
import { PopularArticlesList } from '../../../components/article/PopularArticlesList/PopularArticlesList';
import { useMediaQuery, useTheme } from '@mui/material';

export const Home = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      {!isPhone && <PopularArticlesList isTablet={isTablet} />}
      <Container>
        <ArticleList page={PAGE_TYPE.MAIN} isPhone={isPhone} />
      </Container>
    </>
  );
};
