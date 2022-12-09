import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/auth/authSlice';
import { AppRoutes } from './components/AppRoutes/AppRoutes';

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, userInfo]);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
