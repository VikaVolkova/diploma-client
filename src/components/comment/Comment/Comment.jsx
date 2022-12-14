import { React } from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import Markdown from 'markdown-to-jsx';

export const Comment = ({ comment }) => (
  <>
    <ListItem alignItems="flex-start" key={comment._id}>
      <ListItemText
        primary={
          <Typography component={'span'} color="primary.main">
            {comment.author.name || comment.author.email}
          </Typography>
        }
        secondary={<Markdown>{comment.text}</Markdown>}
      />
    </ListItem>
  </>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
