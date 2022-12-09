import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import { ArticleList } from '../../components/ArticleList/ArticleList';
import { PAGE_TYPE } from '../../helpers';

export const Category = () => {
  const { categoryUrl } = useParams();
  const [category, setCategory] = useState(categoryUrl);

  useEffect(() => {
    setCategory(categoryUrl);
  }, [categoryUrl]);

  return (
    <Container>
      <ArticleList page={PAGE_TYPE.CATEGORY} categoryUrl={category} />
    </Container>
  );
};
