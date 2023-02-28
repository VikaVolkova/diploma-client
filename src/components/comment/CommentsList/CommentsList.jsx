import { React } from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/Comment';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {
  PAGE_TYPE,
  ROLES,
  checkAdmin,
  checkRole,
  MESSAGES,
  MESSAGE_TYPE,
  getDeviceSize,
  loadingBoxStyle,
  BUTTON_VARIANT,
  COLORS,
  TYPOGRAPHY_VARIANTS,
} from '../../../helpers';
import { ActionPanel } from '../../article/ActionPanel/ActionPanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteComment,
  getCommentsByArticleId,
  getUnpublishedComments,
  publishComment,
} from '../../../store/features/comments/commentsMiddlewares';
import s from './CommentsList.module.css';
import { toggleComment } from '../../../store/features/article/articleMiddlewares';
import { Message } from '../../notification/Message/Message';
import { useState } from 'react';
import { getArticleLinkStyle, typographyStyle } from './CommentsList.helpers';

export const CommentsList = ({ articleId, type }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { comments, loadingComments } = useSelector((state) => state.comments);
  const [next, setNext] = useState(4);
  const dispatch = useDispatch();

  const { isTablet, isPhone } = getDeviceSize();
  const buttonStyle = { m: !isTablet ? '3% 40% 7%' : '3% 35% 8%' };
  const articleLinkStyle = getArticleLinkStyle(isPhone);

  const selectFunc = () => {
    return type === PAGE_TYPE.UNPUBLISHED
      ? dispatch(getUnpublishedComments())
      : dispatch(getCommentsByArticleId({ articleId }));
  };

  useEffect(() => {
    selectFunc();
  }, []);

  const publishUnpublishedComment = async (id) => {
    try {
      dispatch(publishComment({ id }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeComment = async (id) => {
    try {
      dispatch(deleteComment({ id })).then((comment) => {
        dispatch(
          toggleComment({
            articleId: comment.payload.data.article,
            commentId: comment.payload.data._id,
            deleted: true,
          }),
        );
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleMoreComments = () => {
    setNext(next + 4);
  };

  loadingComments && (
    <Box sx={loadingBoxStyle}>
      <CircularProgress />
    </Box>
  );

  if (comments.length === 0 && !loadingComments && type === PAGE_TYPE.UNPUBLISHED) {
    return (
      <Container>
        <Message text={MESSAGES.NO_UNPUBLISHED_COMMENTS} type={MESSAGE_TYPE.MAIN} />
      </Container>
    );
  }

  return (
    <>
      {!loadingComments &&
        comments.slice(0, next).map((comment) => (
          <div key={comment._id}>
            {type === PAGE_TYPE.UNPUBLISHED ? (
              <>
                <Typography
                  sx={typographyStyle}
                  variant={TYPOGRAPHY_VARIANTS.BODY2}
                  color={COLORS.PRIMARY}
                >
                  Коментар для{' '}
                  <Link to={`/news/${comment.article.url}`} style={articleLinkStyle}>
                    {comment.article.title}
                  </Link>
                  :
                </Typography>
                <div className={s.commentStyle}>
                  <Comment comment={comment} />
                  {checkRole([ROLES.ADMIN, ROLES.MANAGER], userInfo) && (
                    <ActionPanel
                      handlePublish={
                        checkAdmin(userInfo) &&
                        !comment.isPublished &&
                        (() => publishUnpublishedComment(comment._id))
                      }
                      handleDelete={checkAdmin(userInfo) && (() => removeComment(comment._id))}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className={s.commentStyle}>
                <Comment comment={comment} />
                {userInfo._id === comment.author._id && (
                  <ActionPanel
                    handleDelete={checkAdmin(userInfo) && (() => removeComment(comment._id))}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      {!loadingComments && next < comments.length && (
        <Button variant={BUTTON_VARIANT.CONTAINED} onClick={handleMoreComments} sx={buttonStyle}>
          Більше коментарів
        </Button>
      )}
    </>
  );
};

CommentsList.propTypes = {
  articleId: PropTypes.string,
  type: PropTypes.string,
};
