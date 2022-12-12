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
} from '../../features/article/articleActions';
import { ActionPanel } from '../ActionPanel/ActionPanel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Message } from '../Message/Message';
import { MESSAGES, MESSAGE_TYPE, PAGE_TYPE, ROLES } from '../../helpers';

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

  const removeItem = (id) => setArticlesArr((prev) => prev.filter((item) => item._id !== id));

  const publishArticle = async (id) => {
    try {
      const isPublished = 'true';
      await dispatch(toggleArticlePublish({ id, isPublished }));
      removeItem(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const unpublishArticle = async (id) => {
    try {
      const isPublished = 'true';
      await dispatch(toggleArticlePublish({ id, isPublished }));
      removeItem(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeArticle = async (id) => {
    try {
      await dispatch(deleteArticle({ id }));
      removeItem(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (page === PAGE_TYPE.MAIN) {
      dispatch(getArticles());
    } else if (page === PAGE_TYPE.CATEGORY) {
      dispatch(getArticlesByCategoryUrl({ categoryUrl }));
    } else {
      dispatch(getUnpublishedArticles());
    }
  }, [dispatch, categoryUrl, page]);

  if (loadingArticles) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!loadingArticles && articles.length === 0 && type === PAGE_TYPE.UNPUBLISHED) {
    return <Message text={MESSAGES.NO_UNPUBLISHED_ARTICLES} type={MESSAGE_TYPE.MAIN} />;
  }

  return articlesArr.map((article) => (
    <Grid item key={article._id} marginBottom={5}>
      <Preview article={article} type={isTablet ? 'thumbnail' : 'full'} />
      {type === PAGE_TYPE.UNPUBLISHED && (
        <>
          {[ROLES.ADMIN, ROLES.MANAGER].includes(userInfo.role) && (
            <ActionPanel
              handleEdit={() => navigate(`/update/${article._id}`)}
              handlePublish={
                userInfo?.role === ROLES.ADMIN && !article.isPublished
                  ? () => publishArticle(article._id)
                  : undefined
              }
              handleUnpublish={
                userInfo?.role === ROLES.ADMIN && article.isPublished
                  ? () => unpublishArticle(article._id)
                  : undefined
              }
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
