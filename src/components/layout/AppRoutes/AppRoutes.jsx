import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES, ROLES } from '../../../helpers';
import { Layout } from '../Layout/Layout';
import { Login } from '../../../pages/auth/Login/Login';
import { Register } from '../../../pages/auth/Register/Register';
import { ForgotPassword } from '../../../pages/auth/ForgotPassword/ForgotPassword';
import { RestorePassword } from '../../../pages/auth/RestorePassword/RestorePassword';
import { UpdatePassword } from '../../../pages/auth/UpdatePassword/UpdatePassword';
import { CreateArticle } from '../../../pages/protected/CreateArticle/CreateArticle';
import { ProtectedRoute } from '../../layout/auth/ProtectedRoute/ProtectedRoute';
import { UnpublishedArticles } from '../../../pages/protected/UnpublishedArticles/UnpublishedArticles';
import { Home } from '../../../pages/main/Home/Home';
import { Category } from '../../../pages/main/Category/Category';
import { Article } from '../../../pages/main/Article/Article';
import { CreateCategory } from '../../../pages/protected/CreateCategory/CreateCategory';
import { UnpublishedComments } from '../../../pages/protected/UnpublishedComments/UnpublishedComments';
import { UpdateRole } from '../../../pages/protected/UpdateRole/UpdateRole';
import { UserPage } from '../../../pages/protected/UserPage/UserPage';
import { UpdateUser } from '../../../pages/protected/UpdateUser/UpdateUser';
import { UpdateArticle } from '../../../pages/protected/UpdateArticle/UpdateArticle';

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESTORE_PASSWORD} element={<RestorePassword />} />
      <Route path={ROUTES.UPDATE_PASSWORD} element={<UpdatePassword />} />
      <Route
        path={ROUTES.CREATE_ARTICLE}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <CreateArticle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update/:newsUrl"
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <UpdateArticle />
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
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <UnpublishedComments />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.UPDATE_ROLE}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <UpdateRole />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.USER}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]}>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.UPDATE_USER}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]}>
            <UpdateUser />
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
