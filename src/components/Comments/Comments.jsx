import React from 'react';
import PropTypes from 'prop-types';
import s from './Comments.module.css';
import { SvgIcon } from '../SvgIcon/SvgIcon';

export const Comments = ({ count }) => (
  <div className={s.comments}>
    <SvgIcon size={20} color="#000" name="comments" />
    <span className={s.commentNumber}>{count}</span>
  </div>
);

Comments.propTypes = {
  count: PropTypes.number,
};

Comments.defaultProps = {
  count: 0,
};
