import { React } from 'react';
import { Comment } from '../Comment/Comment';

export const CommentsList = ({ data }) => {
  return data.map((comment) => (
    <div key={comment._id}>
      <Comment comment={comment} />
    </div>
  ));
};
