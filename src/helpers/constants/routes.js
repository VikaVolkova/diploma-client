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
  UPDATE_USER: '/update-user',
  DELETE_USER: '/delete-user',
};

export const ACTION_ROUTES = {
  USER: {
    BASE: 'user',
    LOGIN: 'user/login',
    REGISTER: 'user/register',
    FORGOT_PASSWORD: 'user/forgot-password',
    RESTORE_PASSWORD: 'user/restore-password',
    CHECK_PASSWORD: 'user/check-password',
    UPDATE_USER: 'user/update-user',
    DELETE_USER: 'user/delete-user',
    TOKEN: 'user/token',
    SIGNIN_GOOGLE: 'user/signin-google',
    GET_USER: 'user/me',
    GET_ALL_USERS: 'user/all',
  },
  ARTICLE: {
    BASE: 'news',
    GET_POPULAR_ARTICLES: 'news/popular',
    GET_ARTICLE_BY_URL: 'news/:newsUrl',
    GET_ARTICLES_BY_CATEGORY_URL: 'news/category/',
    GET_UNPUBLISHED_ARTICLES: 'news/unpublished',
    TOGGLE_ARTICLE_PUBLISH: 'news/publish/',
    TOGGLE_ARTICLE_LIKE: 'news/like/',
    UPDATE_ARTICLE: 'news/update/',
    DELETE_ARTICLE: 'news/delete/',
    ADD_COMMENT: 'news/comment/',
  },
  CATEGORY: {
    BASE: '/category',
    CREATE: '/category-create',
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
