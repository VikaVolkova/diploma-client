import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { Container } from '../../../components/layout/Container/Container';
import s from './Article.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticleByUrl,
  toggleArticlePublish,
  deleteArticle,
  toggleLike,
} from '../../../store/features/article/articleMiddlewares';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { CommentsList } from '../../../components/comment/CommentsList/CommentsList';
import { AddComment } from '../../../components/comment/AddComment/AddComment';
import { Message } from '../../../components/notification/Message/Message';
import { ActionPanel } from '../../../components/article/ActionPanel/ActionPanel';
import { ACTION, MESSAGES, MESSAGE_TYPE, ROLES, ROUTES } from '../../../helpers';
import { checkAdmin, checkAuthor, checkRole } from '../../../helpers/helpers';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { pink } from '@mui/material/colors';
import { ShareSocial } from '../../../components/article/ShareSocial/ShareSocial';

export const Article = () => {
  const { newsUrl } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [articleId, setArticleId] = useState(0);
  const [likes, setLikes] = useState([]);
  const { article, loadingArticles } = useSelector((state) => state.article);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArticleByUrl({ newsUrl }));
  }, [dispatch, newsUrl]);

  useEffect(() => {
    if (article && userInfo) {
      setArticleId(article._id);
      setLikes(article.likes);
    }
  }, [article]);

  useEffect(() => {
    userInfo && likes && setIsLiked(likes.includes(userInfo._id) ? true : false);
  }, [likes, userInfo]);

  const removeArticle = (id) => {
    dispatch(deleteArticle({ id }));
    navigate(-1);
  };

  const togglePublish = (id, isPublished) => {
    dispatch(toggleArticlePublish({ id, isPublished }));
    navigate(-1);
  };

  const toggleLikes = (liked, e) => {
    e.preventDefault();
    userInfo && dispatch(toggleLike({ articleId, liked }));
  };

  return (
    !loadingArticles &&
    article && (
      <>
        {article.isPublished && <ShareSocial />}
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
          {userInfo && checkRole([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER], userInfo) && (
            <div className={s.actions}>
              <ActionPanel
                handleEdit={
                  checkAuthor(userInfo, article.author) || checkAdmin(userInfo)
                    ? () => navigate(`${ROUTES.UPDATE_ARTICLE}${article.url}`)
                    : null
                }
                handlePublish={
                  checkAdmin(userInfo) && !article.isPublished
                    ? () => togglePublish(article._id, true)
                    : null
                }
                handleUnpublish={
                  checkAdmin(userInfo) && article.isPublished
                    ? () => togglePublish(article._id, false)
                    : null
                }
                handleDelete={
                  checkAuthor(userInfo, article.author) || checkAdmin(userInfo)
                    ? () => removeArticle(article._id)
                    : null
                }
              />
              <div className={s.interactions}>
                <Tooltip title={isLiked ? ACTION.NO_LIKE : ACTION.LIKE}>
                  <IconButton
                    aria-label={ACTION.LIKE}
                    sx={{ p: 0 }}
                    size="large"
                    onClick={(e) => toggleLikes(!isLiked, e)}
                  >
                    {isLiked ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
                <span className={s.likesCount}>{article?.likes?.length}</span>
              </div>
            </div>
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
          <CommentsList articleId={article._id} />
        </Container>
      </>
    )
  );
};
