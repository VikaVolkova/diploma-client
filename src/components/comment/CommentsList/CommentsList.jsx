import { React } from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/Comment';
import { Box, Button, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { PAGE_TYPE, ROLES, checkAdmin, checkRole, MESSAGES, MESSAGE_TYPE } from '../../../helpers';
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
import { Container } from '../../layout/Container/Container';
import { useState } from 'react';

export const CommentsList = ({ articleId, type }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { comments, loadingComments } = useSelector((state) => state.comments);
  const [next, setNext] = useState(4);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const buttonStyle = { m: !isTablet ? '3% 42% 7%' : '3% 28% 8%' };

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

  if (loadingComments) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!loadingComments && comments.length === 0 && type === PAGE_TYPE.UNPUBLISHED) {
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
                  sx={{ display: 'inline', mr: '15px' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Коментар для{' '}
                  <Link
                    to={`/news/${comment.article.url}`}
                    style={{
                      color: 'royalblue',
                      textDecoration: 'none',
                      fontFamily: 'sans-serif',
                      fontSize: 14,
                    }}
                  >
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
        <Button variant="contained" onClick={handleMoreComments} sx={buttonStyle}>
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
