import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Comments } from '../Comments/Comments';
import articlePropType from '../../proptypes/article';
import s from './Preview.module.css';
import defaultThumb from './defaultThumb.jpg';

const getSpoilerText = (text) => {
  const MAX_SPOILER_LENGTH = 100;
  if (text.length <= MAX_SPOILER_LENGTH) return text;

  const spoilerSpaceIndex = text.indexOf(' ', MAX_SPOILER_LENGTH);

  return `${text.substring(0, spoilerSpaceIndex)}...`;
};

export const Preview = ({ article, type }) => {
  const { spoiler } = article;

  const shortSpoiler = getSpoilerText(spoiler);
  return (
    <div className={cn({ [s[type]]: !!type })}>
      <Link
        to={`/${article?.category?.url}/${article.url}`}
        className={cn(s.pictureWrapper, {
          [s.pictureWrapperFull]: type === 'full',
          [s.pictureWrappeThumbnail]: type === 'thumbnail',
        })}
      >
        <img
          className={s.picture}
          src={article.coverImage ? article.coverImage : defaultThumb}
          alt={article.title}
          id="previewImg"
        />
      </Link>
      <div className={s.textBlock}>
        <div className={s.textBlockTitle}>
          <Link to={`/${article?.category?.url}`} className={s.link}>
            {article.category?.title}
          </Link>
          <Link to={`/${article?.category?.url}/${article.url}`} className={s.comment}>
            <Comments count={article.comments.length} />
          </Link>
        </div>
        <Link to={`/${article?.category.url}/${article.url}`} className={s.title}>
          {article.title}
        </Link>
        <p className={s.spoiler}>
          {type === 'full' ? article.spoiler : shortSpoiler}
          {type === 'full' && (
            <Link to={`/${article?.category.url}/${article.url}`} className={s.articleLink}>
              [Читати далі...]
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

Preview.propTypes = {
  article: PropTypes.shape(articlePropType).isRequired,
  type: PropTypes.oneOf(['full', 'thumbnail']),
};

Preview.defaultProps = {
  type: 'full',
};
