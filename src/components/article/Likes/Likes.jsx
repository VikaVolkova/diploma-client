import React from 'react';
import PropTypes from 'prop-types';
import s from './Likes.module.css';
import cn from 'classnames';
import { LikesIcon } from '../../../assets/svg/LikesIcon.jsx';
import { getDeviceSize, PREVIEW_TYPE } from '../../../helpers';

export const Likes = ({ count, type }) => {
  const { isTablet } = getDeviceSize();
  const size = type === PREVIEW_TYPE.THUMBNAIL || isTablet ? 16 : 20;
  return (
    <div className={s.likes}>
      <LikesIcon size={size} color="#000" />
      <span className={cn({ [s[type]]: !!type })}>{count}</span>
    </div>
  );
};

Likes.propTypes = {
  count: PropTypes.number,
  type: PropTypes.oneOf([PREVIEW_TYPE.FULL, PREVIEW_TYPE.THUMBNAIL, PREVIEW_TYPE.POPULAR]),
};

Likes.defaultProps = {
  count: 0,
  type: PREVIEW_TYPE.FULL,
};
