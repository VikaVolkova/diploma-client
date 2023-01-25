import React from 'react';
import { ArticleList } from '../../../components/article/ArticleList/ArticleList';
import { getDeviceSize, PAGE_TYPE } from '../../../helpers';
import { PopularArticlesList } from '../../../components/article/PopularArticlesList/PopularArticlesList';
import { Container } from '@mui/material';

export const Home = () => {
  const { isLaptop, isPhone } = getDeviceSize();
  return (
    <>
      {!isPhone && <PopularArticlesList isLaptop={isLaptop} />}
      <Container>
        <ArticleList page={PAGE_TYPE.MAIN} isPhone={isPhone} />
      </Container>
    </>
  );
};
