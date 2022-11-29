import React from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";

function Comment({ comment }) {
  return (
    <>
      <ListItem alignItems="flex-start" key={comment._id}>
        <ListItemText
          primary={
            <Typography color="primary.main">
              {comment.authorId.name || comment.authorId.email}
            </Typography>
          }
          secondary={<Markdown>{comment.text}</Markdown>}
        />
      </ListItem>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
