export const cardContentStyle = { display: 'flex', flexDirection: 'column' };

export const cardMediaStyle = { width: 220, height: 150, borderRadius: 2, objectFit: 'cover' };

export const getShortSpoiler = (article) => {
  return article.spoiler.length > 50 ? article.spoiler.slice(0, 50) : article.spoiler;
};
