export const DEFAULT_ARTICLE_IMAGE =
  'https://thetechswing.com/wp-content/uploads/2022/03/Web-Dev-Blog.png';
export const DEFAULT_USER_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png';
export const BASE_URL = 'http://localhost:5000/api';
export const REGISTER_URL = 'http://localhost:5000/api/users/register';
export const OAUTH_CLIENT_ID =
  '945998487819-3fr915t89v64bdgk45gg2bb8k6q6jg85.apps.googleusercontent.com';
export const ACCESS_TOKEN = 'x-access-token';

export const API_REQUEST_PROPS = {
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
};

export const ACTION = {
  EDIT: 'Редагувати',
  PUBLISH: 'Опублікувати',
  UNPUBLISH: 'Скасувати публікацію',
  DELETE: 'Видалити',
};
