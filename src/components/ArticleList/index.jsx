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
} from "../../features/article/articleActions";

export const ArticleList = ({ page, categoryUrl }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (page === "main") {
      dispatch(getArticles());
    } else if (page === "category") {
      dispatch(getArticlesByCategoryUrl({ categoryUrl }));
    } else {
      dispatch(getUnpublishedArticles());
    }
  }, [dispatch, categoryUrl, page]);
  const { articles, loading } = useSelector((state) => state.article);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return articles.map((article) => (
    <Grid item key={article._id} marginBottom={5}>
      <Preview article={article} type={isTablet ? "thumbnail" : "full"} />
    </Grid>
  ));
};
