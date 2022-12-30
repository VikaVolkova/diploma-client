import React, { useEffect } from 'react';
import { Preview } from '../Preview/Preview';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularArticles } from '../../../store/features/article/articleMiddlewares';
import { useState } from 'react';

export const PopularArticlesList = () => {
  const dispatch = useDispatch();
  const { popularArticles } = useSelector((state) => state.article);
  const [sortedArticles, setSortedArticles] = useState([]);

  useEffect(() => {
    dispatch(getPopularArticles());
  }, []);

  useEffect(() => {
    popularArticles.length > 0 &&
      setSortedArticles(popularArticles.slice().sort((a, b) => b.likes.length - a.likes.length));
  }, [popularArticles]);

  return (
    popularArticles && (
      <Grid container spacing={2} justifyContent="space-between">
        {sortedArticles.map((article) => (
          <Grid item key={article._id} xs={12} sm={6} md={3}>
            <Preview article={article} type="thumbnail" />
          </Grid>
        ))}
      </Grid>
    )
  );
};
