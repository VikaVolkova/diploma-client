import React from 'react';
import PropTypes from 'prop-types';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import s from './ArticleSearchItem.module.css';
import { cardContentStyle, cardMediaStyle, getShortSpoiler } from './ArticleSearchItem.helpers';
import { COLORS, TYPOGRAPHY_VARIANTS } from '../../../helpers';

export const ArticleSearchItem = ({ article, handleClose }) => {
  const navigate = useNavigate();
  const showArticle = () => {
    handleClose();
    navigate(`/${article?.category.url}/${article.url}`);
  };

  const shortSpoiler = getShortSpoiler(article);

  return (
    <>
      <Box className={s.card}>
        <CardMedia
          component="img"
          sx={cardMediaStyle}
          image={article.coverImage}
          alt={article.title}
        />
        <CardContent sx={cardContentStyle}>
          <button className={s.title} onClick={showArticle}>
            {article.title}
          </button>
          <Typography variant={TYPOGRAPHY_VARIANTS.SUBTITLE1} color={COLORS.GREY}>
            {shortSpoiler}...
          </Typography>
        </CardContent>
      </Box>
    </>
  );
};

ArticleSearchItem.propTypes = {
  article: PropTypes.shape({
    category: PropTypes.object,
    author: PropTypes.object,
    title: PropTypes.string,
    spoiler: PropTypes.string,
    coverImage: PropTypes.string,
    likes: PropTypes.array,
    url: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func,
};
