import React, { useEffect, useState } from 'react';
import { Preview } from '../Preview/Preview';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularArticles } from '../../../store/features/article/articleMiddlewares';
import PropTypes from 'prop-types';
import s from './PopularArticlesList.module.css';
import { getGridContainerStyle, gridItemMargin } from './PopularArticlesList.helpers';

export const PopularArticlesList = ({ isLaptop }) => {
  const dispatch = useDispatch();
  const { popularArticles } = useSelector((state) => state.article);
  const [sortedArticles, setSortedArticles] = useState([]);
  const gridContainerStyle = getGridContainerStyle(isLaptop);

  useEffect(() => {
    dispatch(getPopularArticles());
  }, []);

  useEffect(() => {
    popularArticles.length > 0 &&
      setSortedArticles(popularArticles.slice().sort((a, b) => b.likes.length - a.likes.length));
    isLaptop && setSortedArticles((prev) => prev.slice(0, 3));
  }, [popularArticles, isLaptop]);

  return (
    popularArticles && (
      <div className={s.container}>
        <Grid container justifyContent="space-around" sx={gridContainerStyle}>
          {sortedArticles.map((article) => (
            <Grid item key={article._id} xs={12} sm={4} lg={3} sx={gridItemMargin}>
              <Preview article={article} type="popular" />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  );
};

PopularArticlesList.propTypes = {
  isLaptop: PropTypes.bool,
};
