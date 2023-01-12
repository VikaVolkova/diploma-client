import React from 'react';
import { Container } from '../../../components/layout/Container/Container';
import { ArticleList } from '../../../components/article/ArticleList/ArticleList';
import { getDeviceSize, PAGE_TYPE } from '../../../helpers';
import { PopularArticlesList } from '../../../components/article/PopularArticlesList/PopularArticlesList';

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
