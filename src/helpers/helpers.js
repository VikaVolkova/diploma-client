import { ROLES, TOKENS } from './constants/auth';

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
