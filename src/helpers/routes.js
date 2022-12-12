export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESTORE_PASSWORD: '/restore-password',
  CREATE_ARTICLE: '/create-article',
  UNPUBLISHED: '/unpublished',
  CATEGORY_URL: ':categoryUrl',
  NEWS_URL: ':newsUrl',
  UNPUBLISHED_COMMENTS: '/unpublished-comments',
  CREATE_CATEGORY: '/create-category',
  CREDENTIALS: '/credentials',
};

export const ACTION_ROUTES = {
  USER: {
    LOGIN: 'user/login',
    REGISTER: 'user/register',
    FORGOT_PASSWORD: 'user/forgot-password',
    RESTORE_PASSWORD: 'user/restore-password',
    TOKEN: 'user/token',
    GET_USER: 'user/me',
  },
  ARTICLE: {
    BASE: 'news',
    GET_ARTICLE_BY_URL: 'news/:newsUrl',
    GET_ARTICLES_BY_CATEGORY_URL: 'news/category/',
    GET_UNPUBLISHED_ARTICLES: 'news/unpublished',
    TOGGLE_ARTICLE_PUBLISH: 'news/publish/',
    DELETE_ARTICLE: 'news/:id',
  },
  CATEGORY: {
    BASE: '/category',
  },
  COMMENT: {
    BASE: 'comments/',
    GET_COMMENTS_BY_ARTICLE_ID: '/comments/article/',
  },
  IMAGE: {
    UPLOAD: 'images/upload',
  },
};
