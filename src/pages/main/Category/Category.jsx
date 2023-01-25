import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleList } from '../../../components/article/ArticleList/ArticleList';
import { getDeviceSize, PAGE_TYPE } from '../../../helpers';

export const Category = () => {
  const { categoryUrl } = useParams();
  const [category, setCategory] = useState(categoryUrl);
  const { isPhone } = getDeviceSize();

  useEffect(() => {
    setCategory(categoryUrl);
  }, [categoryUrl]);

  return (
    <Container>
      <ArticleList page={PAGE_TYPE.CATEGORY} categoryUrl={category} isPhone={isPhone} />
    </Container>
  );
};
