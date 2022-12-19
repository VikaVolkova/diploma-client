export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESTORE_PASSWORD: '/restore-password',
  UPDATE_PASSWORD: '/update-password',
  CREATE_ARTICLE: '/create-article',
  UNPUBLISHED: '/unpublished',
  CATEGORY_URL: ':categoryUrl',
  NEWS_URL: ':newsUrl',
  UNPUBLISHED_COMMENTS: '/unpublished-comments',
  CREATE_CATEGORY: '/create-category',
  USER: '/user',
  UPDATE_ARTICLE: '/update/',
  UPDATE_ROLE: '/update-role/',
};

export const ACTION_ROUTES = {
  USER: {
    BASE: 'user',
    LOGIN: 'user/login',
    REGISTER: 'user/register',
    FORGOT_PASSWORD: 'user/forgot-password',
    RESTORE_PASSWORD: 'user/restore-password',
    CHECK_PASSWORD: 'user/check-password',
    TOKEN: 'user/token',
    GET_USER: 'user/me',
    GET_ALL_USERS: 'user/all',
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
    GET_UNPUBLISHED_COMMENTS: 'comments/unpublished',
    PUBLISH_COMMENT: 'comments/publish/',
    DELETE_COMMENT: 'comments/:id',
  },
  IMAGE: {
    UPLOAD: 'images/upload',
  },
};
