import React, { useEffect } from "react";
import Preview from "../Preview";
import {
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticles,
  getArticlesByCategoryUrl,
  getUnpublishedArticles,
  toggleArticlePublish,
  removeArticle,
} from "../../features/article/articleActions";
import roles from "../../constants/roles";
import ActionPanel from "../ActionPanel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Message from "../Message";

export const ArticleList = ({ page, categoryUrl, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articles, loadingArticles } = useSelector((state) => state.article);
  const { userInfo } = useSelector((state) => state.auth);
  const [articlesArr, setArticlesArr] = useState([]);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!loadingArticles) {
      setArticlesArr(articles);
    }
  }, [loadingArticles, articles]);

  const removeItem = (id) =>
    setArticlesArr((prev) => prev.filter((item) => item._id !== id));

  const publishArticle = async (id) => {
    try {
      const isPublished = "true";
      await dispatch(toggleArticlePublish({ id, isPublished }));
      removeItem(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const unpublishArticle = async (id) => {
    try {
      const isPublished = "true";
      await dispatch(toggleArticlePublish({ id, isPublished }));
      removeItem(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await dispatch(removeArticle({ id }));
      removeItem(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (page === "main") {
      dispatch(getArticles());
    } else if (page === "category") {
      dispatch(getArticlesByCategoryUrl({ categoryUrl }));
    } else {
      dispatch(getUnpublishedArticles());
    }
  }, [dispatch, categoryUrl, page]);

  if (loadingArticles) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!loadingArticles && articles.length === 0 && type === "unpublished") {
    return <Message text="Наразі немає неопублікованих статей" type="main" />;
  }

  return articlesArr.map((article) => (
    <Grid item key={article._id} marginBottom={5}>
      <Preview article={article} type={isTablet ? "thumbnail" : "full"} />
      {type === "unpublished" && (
        <>
          {[roles.admin, roles.manager].includes(userInfo.role) && (
            <ActionPanel
              handleEdit={() => navigate(`/update/${article._id}`)}
              handlePublish={
                userInfo?.role === roles.admin && !article.isPublished
                  ? () => publishArticle(article._id)
                  : undefined
              }
              handleUnpublish={
                userInfo?.role === roles.admin && article.isPublished
                  ? () => unpublishArticle(article._id)
                  : undefined
              }
              handleDelete={() => deleteArticle(article._id)}
            />
          )}
        </>
      )}
    </Grid>
  ));
};
