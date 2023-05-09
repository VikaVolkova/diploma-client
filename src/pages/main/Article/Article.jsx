import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import s from './Article.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticleByUrl,
  toggleArticlePublish,
  deleteArticle,
  toggleLike,
} from '../../../store/features/article/articleMiddlewares';
import { Container, IconButton, Tooltip, Typography } from '@mui/material';
import { CommentsList } from '../../../components/comment/CommentsList/CommentsList';
import { AddComment } from '../../../components/comment/AddComment/AddComment';
import { Message } from '../../../components/notification/Message/Message';
import { ActionPanel } from '../../../components/article/ActionPanel/ActionPanel';
import {
  ACTION,
  articleMargin,
  COLORS,
  commentsBottomMargin,
  commentsTitle,
  MESSAGES,
  MESSAGE_TYPE,
  ROLES,
  ROUTES,
  SIZE_TYPES,
  TYPOGRAPHY_VARIANTS,
} from '../../../helpers';
import { checkAdmin, checkAuthor, checkRole, getDeviceSize } from '../../../helpers/helpers';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { pink } from '@mui/material/colors';
import { ShareSocial } from '../../../components/article/ShareSocial/ShareSocial';

export const Article = () => {
  const { newsUrl } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [articleId, setArticleId] = useState(0);
  const [likes, setLikes] = useState([]);
  const { article } = useSelector((state) => state.article);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isTablet, isMonitor } = getDeviceSize();

  useEffect(() => {
    dispatch(getArticleByUrl({ newsUrl }));
  }, [newsUrl]);

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

  const toggleLikes = (liked) => {
    userInfo && dispatch(toggleLike({ articleId, liked }));
  };

  return (
    article && (
      <>
        {article.isPublished && isMonitor && <ShareSocial />}
        <Container>
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
              {article.isPublished && (
                <div className={s.interactions}>
                  <Tooltip title={isLiked ? ACTION.NO_LIKE : ACTION.LIKE}>
                    <IconButton
                      aria-label={ACTION.LIKE}
                      sx={{ p: 0 }}
                      onClick={(e) => toggleLikes(!isLiked, e)}
                    >
                      {isLiked ? (
                        <FavoriteIcon
                          sx={{ color: pink[500] }}
                          fontSize={isTablet ? 'small' : SIZE_TYPES.MEDIUM}
                        />
                      ) : (
                        <FavoriteBorderIcon fontSize={isTablet ? 'small' : SIZE_TYPES.MEDIUM} />
                      )}
                      <span className={s.likesCount}>{article.likes?.length}</span>
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          )}
        </Container>
        <Container sx={articleMargin}>
          <Markdown>{article.content}</Markdown>
        </Container>
        {article.isPublished && (
          <Container sx={commentsBottomMargin}>
            <Typography variant={TYPOGRAPHY_VARIANTS.H6} color={COLORS.PRIMARY} sx={commentsTitle}>
              Коментарі
            </Typography>
            {userInfo && !userInfo.isBlocked ? (
              <AddComment article={article._id} />
            ) : (
              !userInfo && <Message text={MESSAGES.UNAUTHORIZED} type={MESSAGE_TYPE.LOGIN} />
            )}
            <CommentsList articleId={article._id} />
          </Container>
        )}
      </>
    )
  );
};
