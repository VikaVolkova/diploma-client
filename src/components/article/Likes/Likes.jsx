import React from 'react';
import PropTypes from 'prop-types';
import s from './Likes.module.css';
import { LikesIcon } from '../../../assets/svg/LikesIcon.jsx';

export const Likes = ({ count }) => (
  <div className={s.likes}>
    <LikesIcon size={20} color="#000" />
    <span className={s.likesNumber}>{count}</span>
  </div>
);

Likes.propTypes = {
  count: PropTypes.number,
};

Likes.defaultProps = {
  count: 0,
};
