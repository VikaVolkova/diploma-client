import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RestorePassword from "./pages/RestorePassword";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import Category from "./pages/Category";
import Article from "./pages/Article";

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, userInfo]);
  const location = useLocation();
  const background = location.state;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/restore-password" element={<RestorePassword />} />
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path=":categoryUrl">
            <Route index element={<Category />} />
            <Route path=":newsUrl">
              <Route index element={<Article />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
