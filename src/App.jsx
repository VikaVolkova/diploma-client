import { useEffect, React } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './features/auth/authSlice';
import { AppRoutes } from './components/AppRoutes/AppRoutes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
