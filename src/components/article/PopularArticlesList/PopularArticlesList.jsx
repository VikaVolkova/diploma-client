import React, { useEffect } from 'react';
import { Preview } from '../Preview/Preview';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularArticles } from '../../../store/features/article/articleMiddlewares';

export const PopularArticlesList = () => {
  const dispatch = useDispatch();
  const { popularArticles } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(getPopularArticles());
  }, []);

  return (
    popularArticles && (
      <Grid container spacing={2} justifyContent="space-between">
        {popularArticles.map((article) => (
          <Grid item key={article._id} xs={12} sm={6} md={3}>
            <Preview article={article} type="thumbnail" />
          </Grid>
        ))}
      </Grid>
    )
  );
};
