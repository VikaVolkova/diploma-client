import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Likes } from '../Likes/Likes';
import s from './Preview.module.css';
import { getShortText, PREVIEW_TYPE } from '../../../helpers';

export const Preview = ({ article, type }) => {
  const { spoiler, title } = article;

  const shortSpoiler = getShortText(spoiler, 70);
  const shortTitle = getShortText(title, 20);

  const articleTitle = type === PREVIEW_TYPE.FULL ? article.title : shortTitle;
  const articleSpoiler = type === PREVIEW_TYPE.FULL ? article.spoiler : shortSpoiler;
  return (
    <div className={cn({ [s[type]]: !!type })}>
      <Link
        to={`/${article?.category?.url}/${article.url}`}
        className={cn(s.pictureWrapper, {
          [s.pictureWrapperFull]: type === PREVIEW_TYPE.FULL,
          [s.pictureWrapperThumbnail]: type === PREVIEW_TYPE.THUMBNAIL,
          [s.pictureWrapperPopular]: type === PREVIEW_TYPE.POPULAR,
        })}
      >
        <img className={s.picture} src={article.coverImage} alt={article.title} id="previewImg" />
      </Link>
      <div className={s.textBlock}>
        <div className={s.textBlockTitle}>
          <Link to={`/${article?.category?.url}`} className={s.link}>
            {article.category?.name}
          </Link>
          <Link to={`/${article?.category?.url}/${article.url}`} className={s.likes}>
            <Likes count={article?.likes?.length} type={type} />
          </Link>
        </div>
        <Link to={`/${article?.category.url}/${article.url}`} className={s.title}>
          {articleTitle}
        </Link>
        <p className={s.spoiler}>
          {articleSpoiler}
          {type === PREVIEW_TYPE.FULL && (
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
  type: PropTypes.oneOf([PREVIEW_TYPE.FULL, PREVIEW_TYPE.POPULAR, PREVIEW_TYPE.THUMBNAIL]),
};

Preview.defaultProps = {
  type: PREVIEW_TYPE.FULL,
};
