import React from 'react';
import { Container } from '../../components/Container/Container';
import { ArticleList } from '../../components/ArticleList/ArticleList';
import { PAGE_TYPE } from '../../helpers';

export const UnpublishedArticles = () => (
  <Container>
    <ArticleList page={PAGE_TYPE.UNPUBLISHED} type={PAGE_TYPE.UNPUBLISHED} />
  </Container>
);
