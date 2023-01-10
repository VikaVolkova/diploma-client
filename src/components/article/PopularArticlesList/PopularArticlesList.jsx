import React, { useEffect, useState } from 'react';
import { Preview } from '../Preview/Preview';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularArticles } from '../../../store/features/article/articleMiddlewares';
import PropTypes from 'prop-types';
import s from './PopularArticlesList.module.css';
import {
  getGridContainerStyle,
  getTitleStyle,
  gridItemMargin,
} from './PopularArticlesList.helpers';

export const PopularArticlesList = ({ isTablet }) => {
  const dispatch = useDispatch();
  const { popularArticles } = useSelector((state) => state.article);
  const [sortedArticles, setSortedArticles] = useState([]);
  const titleStyle = getTitleStyle(isTablet);
  const gridContainerStyle = getGridContainerStyle(isTablet);

  useEffect(() => {
    dispatch(getPopularArticles());
  }, []);

  useEffect(() => {
    popularArticles.length > 0 &&
      setSortedArticles(popularArticles.slice().sort((a, b) => b.likes.length - a.likes.length));
    isTablet && setSortedArticles((prev) => prev.slice(0, 3));
  }, [popularArticles, isTablet]);

  return (
    popularArticles && (
      <div className={s.container}>
        <Typography variant="h6" m={titleStyle}>
          Популярні статті
        </Typography>
        <Grid container justifyContent="space-around" sx={gridContainerStyle}>
          {sortedArticles.map((article) => (
            <Grid item key={article._id} xs={12} sm={4} md={3} sx={gridItemMargin}>
              <Preview article={article} type="popular" isTablet={!!isTablet} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  );
};

PopularArticlesList.propTypes = {
  isTablet: PropTypes.bool,
};
