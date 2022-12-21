import React from 'react';
import { Container } from '../../../components/layout/Container/Container';
import { ArticleList } from '../../../components/article/ArticleList/ArticleList';
import { PAGE_TYPE } from '../../../helpers';
import { PopularArticlesList } from '../../../components/article/PopularArticlesList/PopularArticlesList';

export const Home = () => (
  <Container>
    <PopularArticlesList />
    <ArticleList page={PAGE_TYPE.MAIN} />
  </Container>
);
