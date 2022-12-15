import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { Container } from '../../../components/layout/Container/Container';
import s from './Article.module.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticleByUrl,
  toggleArticlePublish,
  deleteArticle,
} from '../../../store/features/article/articleMiddlewares';
import { getCommentsByArticleId } from '../../../store/features/comments/commentsMiddlewares';
import { Typography } from '@mui/material';
import { CommentsList } from '../../../components/comment/CommentsList/CommentsList';
import { AddComment } from '../../../components/comment/AddComment/AddComment';
import { Message } from '../../../components/notification/Message/Message';
import { ActionPanel } from '../../../components/article/ActionPanel/ActionPanel';
import { MESSAGES, MESSAGE_TYPE, ROLES, ROUTES } from '../../../helpers';
import { checkAdmin, checkAuthor, checkRole } from '../../../helpers/helpers';

export const Article = () => {
  const { newsUrl } = useParams();
  const dispatch = useDispatch();
  const { article, loadingArticles } = useSelector((state) => state.article);
  const { comments, loadingComments } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArticleByUrl({ newsUrl }));
  }, [dispatch, newsUrl]);

  let articleId = 0;
  if (article) {
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

  const removeArticle = (id) => {
    dispatch(deleteArticle({ id }));
    navigate(-1);
  };

  const togglePublish = (id, isPublished) => {
    dispatch(toggleArticlePublish({ id, isPublished }));
    navigate(-1);
  };

  return (
    article &&
    !loadingComments && (
      <>
        <Container size="lg">
          <div className={s.containerBaner}>
            <div
              className={s.baner}
              style={{
                backgroundImage: `url(${article.coverImage})`,
              }}
            />
            <h1 className={s.title}>{article.title}</h1>
          </div>
          {userInfo && checkRole([ROLES.ADMIN, ROLES.MANAGER], userInfo) && (
            <ActionPanel
              handleEdit={
                (checkAuthor(userInfo, article.author) || checkAdmin(userInfo)) &&
                (() => navigate(`${ROUTES.UPDATE_LINK}${article._id}`))
              }
              handlePublish={
                checkAdmin(userInfo) &&
                !article.isPublished &&
                (() => togglePublish(article._id, true))
              }
              handleUnpublish={
                checkAdmin(userInfo) &&
                article.isPublished &&
                (() => togglePublish(article._id, false))
              }
              handleDelete={
                (checkAuthor(userInfo, article.author) || checkAdmin(userInfo)) &&
                (() => removeArticle(article._id))
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
