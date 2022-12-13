import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { Container } from '../../components/Container/Container';
import s from './Article.module.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import defaultBanner from './defaultBanner.jpg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticleByUrl,
  toggleArticlePublish,
  deleteArticle,
} from '../../features/article/articleActions';
import { getCommentsByArticleId } from '../../features/comments/commentsActions';
import { Typography } from '@mui/material';
import { CommentsList } from '../../components/CommentsList/CommentsList';
import { AddComment } from '../../components/AddComment/AddComment';
import { Message } from '../../components/Message/Message';
import { ActionPanel } from '../../components/ActionPanel/ActionPanel';
import { MESSAGES, MESSAGE_TYPE, ROLES } from '../../helpers';

export const Article = () => {
  const { newsUrl } = useParams();
  const dispatch = useDispatch();
  const { article, loadingArticles } = useSelector((state) => state.article);
  const { comments } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArticleByUrl({ newsUrl }));
  }, [dispatch, newsUrl]);

  let bannerSrc = defaultBanner;
  let articleId = 0;
  if (article) {
    bannerSrc = article.coverImage ?? defaultBanner;
    articleId = article._id;
  }

  useEffect(() => {
    articleId && dispatch(getCommentsByArticleId({ articleId }));
  }, [articleId, dispatch]);

  if (loadingArticles) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const removeArticle = async (id) => {
    await dispatch(deleteArticle({ id }));
    navigate(-1);
  };

  const publishArticle = async (id) => {
    const isPublished = true;
    await dispatch(toggleArticlePublish({ id, isPublished }));
    navigate(-1);
  };

  const unpublishArticle = async (id) => {
    const isPublished = false;
    await dispatch(toggleArticlePublish({ id, isPublished }));
    navigate(-1);
  };

  return (
    article &&
    comments && (
      <>
        <Container size="lg">
          <div className={s.containerBaner}>
            <div
              className={s.baner}
              style={{
                backgroundImage: `url(${bannerSrc})`,
              }}
            />
            <h1 className={s.title}>{article.title}</h1>
          </div>
          {userInfo && [ROLES.ADMIN, ROLES.MANAGER].includes(userInfo.role) && (
            <ActionPanel
              handleEdit={
                userInfo?._id === article.author || userInfo?.role === ROLES.ADMIN
                  ? () => navigate(`/update/${article._id}`)
                  : undefined
              }
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
              handleDelete={
                userInfo?._id === article.author || userInfo?.role === ROLES.ADMIN
                  ? () => removeArticle(article._id)
                  : undefined
              }
            />
          )}
        </Container>
        <Container>
          <Markdown>{article.content}</Markdown>
        </Container>
        <Container>
          <Typography variant="h6" sx={{ marginTop: '50px', color: 'primary.main' }}>
            Коментарі
          </Typography>
          {userInfo ? (
            <AddComment article={article._id} />
          ) : (
            <Message text={MESSAGES.UNAUTHORIZED} type={MESSAGE_TYPE.LOGIN} />
          )}
          <CommentsList data={comments} />
        </Container>
      </>
    )
  );
};
