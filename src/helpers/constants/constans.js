export const DEFAULT_ARTICLE_IMAGE =
  'https://thetechswing.com/wp-content/uploads/2022/03/Web-Dev-Blog.png';
export const DEFAULT_USER_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png';
export const NOT_FOUND_ILLUSTRATION =
  'https://res.cloudinary.com/dtrtjvdfj/image/upload/v1674228988/3828537_ryra6w.jpg';
export const NOT_FOUND_ALT = "The page doesn't exist";
export const BASE_URL = 'http://localhost:5000/api';
export const WEBSITE_URL = 'http://localhost:3000';
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
  LIKE: 'Подобається',
  NO_LIKE: 'Не подобається',
  SHARE: 'Поділитись',
  BLOCK: 'Заблокувати користувача',
  UNBLOCK: 'Розблокувати користувача',
  RESTORE: 'Відновити',
  SEARCH: 'Пошук',
  CLOSE: 'Закрити',
};

export const SIZE_TYPES = {
  SMALL: 'small',
  MEDIUM: 'nedium',
  LARGE: 'large',
  LG: 'lg',
  MD: 'md',
};

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
};

export const BUTTON_VARIANT = {
  CONTAINED: 'contained',
  TEXT: 'text',
  OUTLINED: 'outlined',
};

export const INPUT_TYPE = {
  TEXT: 'text',
  NAME: 'name',
  PASSWORD: 'password',
  EMAIL: 'email',
};

export const NAME_TYPE = {
  TEXT: 'text',
  NAME: 'name',
  PASSWORD: 'password',
  PASSWORD1: 'password1',
  PASSWORD2: 'password2',
  OLD_PASSWORD: 'oldPassword',
  EMAIL: 'email',
};

export const TYPOGRAPHY_VARIANTS = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  SUBTITLE1: 'subtitle1',
  SUBTITLE2: 'subtitle2',
  BODY1: 'body1',
  BODY2: 'body2',
};

export const COLORS = {
  WHITE: 'white',
  GREY: 'grey',
  ERROR: 'error',
  PRIMARY: 'primary',
};
