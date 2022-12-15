import React, { useEffect } from 'react';
import { Preview } from '../Preview/Preview';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticles,
  getArticlesByCategoryUrl,
  getUnpublishedArticles,
  toggleArticlePublish,
  deleteArticle,
} from '../../../store/features/article/articleMiddlewares';
import { ActionPanel } from '../ActionPanel/ActionPanel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Message } from '../../notification/Message/Message';
import { MESSAGES, MESSAGE_TYPE, PAGE_TYPE, PREVIEW_TYPE, ROLES, ROUTES } from '../../../helpers';
import { checkAdmin, checkRole } from '../../../helpers';

export const ArticleList = ({ page, categoryUrl, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articles, loadingArticles } = useSelector((state) => state.article);
  const { userInfo } = useSelector((state) => state.auth);
  const [articlesArr, setArticlesArr] = useState([]);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!loadingArticles) {
      setArticlesArr(articles);
    }
  }, [loadingArticles, articles]);

  const selectDispatch = (page, categoryUrl) => {
    switch (page) {
      case PAGE_TYPE.MAIN:
        dispatch(getArticles());
        break;
      case PAGE_TYPE.CATEGORY:
        dispatch(getArticlesByCategoryUrl({ categoryUrl }));
        break;
      case PAGE_TYPE.UNPUBLISHED:
        dispatch(getUnpublishedArticles());
        break;
    }
  };

  const publishArticle = async (id) => {
    try {
      dispatch(toggleArticlePublish({ id, isPublished: true }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeArticle = async (id) => {
    try {
      dispatch(deleteArticle({ id }));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    selectDispatch(page, categoryUrl);
  }, [dispatch, categoryUrl, page]);

  if (loadingArticles) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!loadingArticles && articles.length === 0) {
    return (
      <Message
        text={
          type === PAGE_TYPE.UNPUBLISHED
            ? MESSAGES.NO_UNPUBLISHED_ARTICLES
            : MESSAGES.NO_CATEGORY_ARTICLES
        }
        type={MESSAGE_TYPE.MAIN}
      />
    );
  }

  return articlesArr.map((article) => (
    <Grid item key={article._id} marginBottom={5}>
      <Preview article={article} type={isTablet ? PREVIEW_TYPE.THUMBNAIL : PREVIEW_TYPE.FULL} />
      {type === PAGE_TYPE.UNPUBLISHED && (
        <>
          {checkRole([ROLES.ADMIN, ROLES.MANAGER], userInfo) && (
            <ActionPanel
              handleEdit={() => navigate(`${ROUTES.UPDATE_LINK}${article._id}`)}
              handlePublish={checkAdmin(userInfo) && (() => publishArticle(article._id))}
              handleDelete={() => removeArticle(article._id)}
            />
          )}
        </>
      )}
    </Grid>
  ));
};

ArticleList.propTypes = {
  page: PropTypes.oneOf([PAGE_TYPE.CATEGORY, PAGE_TYPE.MAIN, PAGE_TYPE.UNPUBLISHED]),
  categoryUrl: PropTypes.string,
  type: PropTypes.string,
};
