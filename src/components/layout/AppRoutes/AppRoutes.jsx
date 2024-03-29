import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES, ROLES } from '../../../helpers';
import { Layout } from '../Layout/Layout';
import { Login } from '../../../pages/auth/Login/Login';
import { Register } from '../../../pages/auth/Register/Register';
import { ForgotPassword } from '../../../pages/auth/ForgotPassword/ForgotPassword';
import { RestorePassword } from '../../../pages/auth/RestorePassword/RestorePassword';
import { UpdatePassword } from '../../../pages/auth/UpdatePassword/UpdatePassword';
import { CreateArticle } from '../../../pages/protected/article/CreateArticle/CreateArticle';
import { ProtectedRoute } from '../../layout/auth/ProtectedRoute/ProtectedRoute';
import { UnpublishedArticles } from '../../../pages/protected/article/UnpublishedArticles/UnpublishedArticles';
import { Home } from '../../../pages/main/Home/Home';
import { Category } from '../../../pages/main/Category/Category';
import { Article } from '../../../pages/main/Article/Article';
import { CreateCategory } from '../../../pages/protected/category/CreateCategory/CreateCategory';
import { UnpublishedComments } from '../../../pages/protected/comment/UnpublishedComments/UnpublishedComments';
import { Users } from '../../../pages/protected/user/Users/Users';
import { UserPage } from '../../../pages/protected/user/UserPage/UserPage';
import { UpdateUser } from '../../../pages/protected/user/UpdateUser/UpdateUser';
import { UpdateArticle } from '../../../pages/protected/article/UpdateArticle/UpdateArticle';
import { Categories } from '../../../pages/protected/category/Categories/Categories';
import { UpdateCategory } from '../../../pages/protected/category/UpdateCategory/UpdateCategory';
import { NotFound } from '../../../pages/main/NotFound/NotFound';

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Layout />}>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESTORE_PASSWORD} element={<RestorePassword />} />
      <Route path={ROUTES.UPDATE_PASSWORD} element={<UpdatePassword />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
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
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <CreateCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.EDIT_CATEGORIES}
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <Categories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update-category/:categoryUrl"
        element={
          <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
            <UpdateCategory />
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
            <Users />
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
