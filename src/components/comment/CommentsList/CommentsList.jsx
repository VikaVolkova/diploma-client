import { React } from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/Comment';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { PAGE_TYPE, ROLES, checkAdmin, checkRole } from '../../../helpers';
import { ActionPanel } from '../../article/ActionPanel/ActionPanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteComment,
  publishComment,
} from '../../../store/features/comments/commentsMiddlewares';
import s from './CommentsList.module.css';

export const CommentsList = ({ data, type }) => {
  const [commentsArr, setCommentsArr] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const { loadingComments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    setCommentsArr(data);
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
      dispatch(deleteComment({ id }));
    } catch (err) {
      console.log(err.message);
    }
  };

  if (loadingComments) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return commentsArr.map((comment) => (
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
  ));
};

CommentsList.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
};
