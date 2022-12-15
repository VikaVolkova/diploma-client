import React from 'react';
import PropTypes from 'prop-types';
import CommentIcon from './CommentIcon.svg';

export const CommentsIcon = ({ name, color, size }) => (
  <svg fill={color} width={size} height={size}>
    <use xlinkHref={`${CommentIcon}#${name}`} />
  </svg>
);

CommentsIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

CommentsIcon.defaultProps = {
  color: '#000',
  size: 20,
};
