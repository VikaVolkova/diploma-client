import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Article from "./pages/Article";
import Gallery from "./components/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  const background = location.state;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path=":categoryUrl">
            <Route index element={<Category />} />
            <Route path=":newsUrl">
              <Route index element={<Article />} />
              <Route path="image" element={<Gallery />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
