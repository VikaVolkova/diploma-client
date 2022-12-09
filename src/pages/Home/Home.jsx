import React from 'react';
import { Container } from '../../components/Container/Container';
import { ArticleList } from '../../components/ArticleList/ArticleList';
import { PAGE_TYPE } from '../../helpers';

export const Home = () => (
  <Container>
    <ArticleList page={PAGE_TYPE.MAIN} />
  </Container>
);
