import React from 'react';
import { Container } from '../../../components/layout/Container/Container';
import { ArticleList } from '../../../components/article/ArticleList/ArticleList';
import { PAGE_TYPE } from '../../../helpers';

export const Home = () => (
  <Container>
    <ArticleList page={PAGE_TYPE.MAIN} />
  </Container>
);
