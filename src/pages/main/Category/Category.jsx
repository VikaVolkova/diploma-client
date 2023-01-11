import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../../components/layout/Container/Container';
import { ArticleList } from '../../../components/article/ArticleList/ArticleList';
import { PAGE_TYPE } from '../../../helpers';
import { useMediaQuery, useTheme } from '@mui/material';

export const Category = () => {
  const { categoryUrl } = useParams();
  const [category, setCategory] = useState(categoryUrl);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setCategory(categoryUrl);
  }, [categoryUrl]);

  return (
    <Container>
      <ArticleList page={PAGE_TYPE.CATEGORY} categoryUrl={category} isPhone={isPhone} />
    </Container>
  );
};
