import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../helpers';
import { ROLES } from '../../helpers';
import { Layout } from '../Layout/Layout';
import { Login } from '../../pages/Login/Login';
import { Register } from '../../pages/Register/Register';
import { ForgotPassword } from '../../pages/ForgotPassword/ForgotPassword';
import { RestorePassword } from '../../pages/RestorePassword/RestorePassword';
import { CreateArticle } from '../../pages/CreateArticle/CreateArticle';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { UnpublishedArticles } from '../../pages/UnpublishedArticles/UnpublishedArticles';
import { Home } from '../../pages/Home/Home';
import { Category } from '../../pages/Category/Category';
import { Article } from '../../pages/Article/Article';
import CreateCategory from '../../pages/CreateCategory/CreateCategory';
import UnpublishedComments from '../../pages/UnpublishedComments/UnpublishedComments';

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESTORE_PASSWORD} element={<RestorePassword />} />
      <Route
        path={ROUTES.CREATE_ARTICLE}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <CreateArticle />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.UNPUBLISHED}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <UnpublishedArticles />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.CREATE_CATEGORY}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <CreateCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.UNPUBLISHED_COMMENTS}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <UnpublishedComments />
          </ProtectedRoute>
        }
      />

      <Route index element={<Home />} />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.CATEGORY_URL}>
        <Route index element={<Category />} />
        <Route path={ROUTES.NEWS_URL}>
          <Route index element={<Article />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);
