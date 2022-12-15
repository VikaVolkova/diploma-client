import { useEffect, React } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/features/auth/authSlice';
import { AppRoutes } from './components/layout/AppRoutes/AppRoutes';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return <AppRoutes />;
};
