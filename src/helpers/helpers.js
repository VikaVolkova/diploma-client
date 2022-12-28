import jwtDecode from 'jwt-decode';
import { ROLES, TOKENS } from './constants/auth';
import { ERROR_MESSAGES } from './constants/message';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(TOKENS.ACCESS_TOKEN) || '';
  return accessToken;
};

export const setAccessToken = (accessToken) => {
  localStorage.setItem(TOKENS.ACCESS_TOKEN, accessToken);
};

export const removeItemFromStorage = (item) => {
  localStorage.removeItem(item);
};

export const checkRole = (roles, user) => {
  return !![...roles].includes(user.role);
};

export const checkAdmin = (user) => {
  return user?.role === ROLES.ADMIN;
};

export const checkAuthor = (user, author) => {
  return user?._id === author._id;
};

export const decodeToken = (token) => {
  const user = jwtDecode(token);
  const { email, name } = user;
  const image = user.picture;
  return { email, name, image };
};

export const selectErrorMessage = (error) => {
  const errorMessage =
    error === ERROR_MESSAGES.FAILED_400
      ? ERROR_MESSAGES.USER_NO_EXIST
      : error === ERROR_MESSAGES.FAILED_404
      ? ERROR_MESSAGES.PASSWORD
      : '';
  return errorMessage;
};
