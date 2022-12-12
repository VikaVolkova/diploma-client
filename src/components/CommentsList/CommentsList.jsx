import { React } from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/Comment';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const CommentsList = ({ data, type }) => {
  return data.map((comment) => (
    // <div key={comment._id}>
    //   <Comment comment={comment} />
    // </div>
    <div key={comment.id}>
      {type === 'unpublished' ? (
        <>
          <Typography
            sx={{ display: 'inline', mr: '15px' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Коментар для{' '}
            <Link
              to={`/news/${comment.articleId.url}`}
              style={{
                color: 'royalblue',
                textDecoration: 'none',
                fontFamily: 'sans-serif',
                fontSize: 14,
              }}
            >
              {comment.articleId.title}
            </Link>
            :
          </Typography>
          <Comment comment={comment} />
        </>
      ) : (
        <Comment comment={comment} />
      )}
    </div>
  ));
};

CommentsList.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
};
