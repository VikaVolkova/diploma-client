import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Likes } from '../Likes/Likes';
import s from './Preview.module.css';
import { getSpoilerText, PREVIEW_TYPE } from '../../../helpers';

export const Preview = ({ article, type }) => {
  const { spoiler } = article;

  const shortSpoiler = getSpoilerText(spoiler);
  return (
    <div className={cn({ [s[type]]: !!type })}>
      <Link
        to={`/${article?.category?.url}/${article.url}`}
        className={cn(s.pictureWrapper, {
          [s.pictureWrapperFull]: type === PREVIEW_TYPE.FULL,
          [s.pictureWrappeThumbnail]: type === PREVIEW_TYPE.THUMBNAIL,
        })}
      >
        <img className={s.picture} src={article.coverImage} alt={article.title} id="previewImg" />
      </Link>
      <div className={s.textBlock}>
        <div className={s.textBlockTitle}>
          <Link to={`/${article?.category?.url}`} className={s.link}>
            {article.category?.title}
          </Link>
          <Link to={`/${article?.category?.url}/${article.url}`} className={s.comment}>
            <Likes count={article?.likes?.length} />
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
  article: PropTypes.shape({
    category: PropTypes.object,
    author: PropTypes.object,
    title: PropTypes.string,
    spoiler: PropTypes.string,
    coverImage: PropTypes.string,
    likes: PropTypes.array,
    url: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['full', 'thumbnail']),
};

Preview.defaultProps = {
  type: 'full',
};
