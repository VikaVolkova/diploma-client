import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Preview } from '../Preview/Preview';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticles,
  getArticlesByCategoryUrl,
  getUnpublishedArticles,
  toggleArticlePublish,
  deleteArticle,
} from '../../../store/features/article/articleMiddlewares';
import { ActionPanel } from '../ActionPanel/ActionPanel';
import { Message } from '../../notification/Message/Message';
import {
  MESSAGES,
  MESSAGE_TYPE,
  PAGE_TYPE,
  PREVIEW_TYPE,
  ROLES,
  ROUTES,
  checkAdmin,
  checkRole,
  SIZE_TYPES,
  BUTTON_VARIANT,
} from '../../../helpers';
import { getButtonStyle, loadingBoxStyle } from './ArticleList.helpers';

export const ArticleList = ({ page, categoryUrl, type, isPhone }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingArticles } = useSelector((state) => state.article);
  const { userInfo } = useSelector((state) => state.auth);
  const [next, setNext] = useState(4);
  const [articlesArray, setArticlesArray] = useState([]);

  const buttonStyle = getButtonStyle(isPhone);
  const buttonSize = isPhone ? SIZE_TYPES.SMALL : SIZE_TYPES.MEDIUM;

  const selectDispatch = (page, categoryUrl) => {
    let dispatchFunc = () => {};
    switch (page) {
      case PAGE_TYPE.MAIN:
        dispatchFunc = getArticles;
        break;
      case PAGE_TYPE.CATEGORY:
        dispatchFunc = () => getArticlesByCategoryUrl({ categoryUrl });
        break;
      case PAGE_TYPE.UNPUBLISHED:
        dispatchFunc = getUnpublishedArticles;
        break;
    }
    return dispatchFunc;
  };

  useEffect(() => {
    dispatch(selectDispatch(page, categoryUrl)()).then((res) => {
      !res.payload.data ? navigate(ROUTES.NOT_FOUND) : setArticlesArray(res.payload.data);
    });
    setArticlesArray([]);
  }, [dispatch, categoryUrl, page]);

  const publishArticle = async (id) => {
    try {
      dispatch(toggleArticlePublish({ id, isPublished: true }));
      setArticlesArray(articlesArray.filter((article) => article._id !== id));
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

  const handleMoreArticles = () => {
    setNext(next + 4);
  };

  loadingArticles && (
    <Box sx={loadingBoxStyle}>
      <CircularProgress />
    </Box>
  );

  if (articlesArray.length === 0 && !loadingArticles) {
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

  return (
    <>
      {!loadingArticles &&
        articlesArray.slice(0, next).map((article) => (
          <Grid item key={article._id} marginY={2}>
            <Preview
              article={article}
              type={isPhone ? PREVIEW_TYPE.THUMBNAIL : PREVIEW_TYPE.FULL}
            />
            {type === PAGE_TYPE.UNPUBLISHED && (
              <>
                {checkRole([ROLES.ADMIN, ROLES.MANAGER], userInfo) && (
                  <ActionPanel
                    handleEdit={() => navigate(`${ROUTES.UPDATE_ARTICLE}${article.url}`)}
                    handlePublish={checkAdmin(userInfo) ? () => publishArticle(article._id) : null}
                    handleDelete={() => removeArticle(article._id)}
                  />
                )}
              </>
            )}
          </Grid>
        ))}
      {!loadingArticles && next < articlesArray.length && (
        <Box sx={buttonStyle}>
          <Button variant={BUTTON_VARIANT.CONTAINED} onClick={handleMoreArticles} size={buttonSize}>
            Більше новин
          </Button>
        </Box>
      )}
    </>
  );
};

ArticleList.propTypes = {
  page: PropTypes.oneOf([PAGE_TYPE.CATEGORY, PAGE_TYPE.MAIN, PAGE_TYPE.UNPUBLISHED]),
  categoryUrl: PropTypes.string,
  type: PropTypes.string,
  isPhone: PropTypes.bool,
};
