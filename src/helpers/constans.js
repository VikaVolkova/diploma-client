export const ROLES = {
  USER: 'USER',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
};

export const PAGE_TYPE = {
  MAIN: 'main',
  UNPUBLISHED: 'unpublished',
  CATEGORY: 'category',
};

export const MESSAGE_TYPE = {
  MAIN: 'main',
  LOGIN: 'login',
};

export const TOKENS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const MESSAGES = {
  UNAUTHORIZED:
    'Тільки зареєстровані користувачі можуть залишати повідомлення.Будь-ласка зайдіть або зареєструйстесь.',
  NO_RIGHTS: 'Сторінка доступна тільки користувачам з роллю адміністратора',
  NO_UNPUBLISHED_ARTICLES: 'Наразі немає неопублікованих статей',
  NO_UNPUBLISHED_COMMENTS: 'Наразі немає неопублікованих коментарів',
};

export const defaultImage = 'https://thetechswing.com/wp-content/uploads/2022/03/Web-Dev-Blog.png';
