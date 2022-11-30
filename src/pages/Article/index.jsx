import React, { useEffect, useCallback, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import Container from "../../components/Container";
import s from "./index.module.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import defaultBanner from "./defaultBanner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getArticleByUrl } from "../../features/article/articleActions";
import { getCommentsByArticleId } from "../../features/comments/commentsActions";
import { Typography } from "@mui/material";
import { CommentsList } from "../../components/CommentsList";
import AddComment from "../../components/AddComment";
import Message from "../../components/Message";

function Article() {
  const { newsUrl } = useParams();
  const dispatch = useDispatch();
  const { article, loadingArticles } = useSelector((state) => state.article);
  const { comments } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getArticleByUrl({ newsUrl }));
  }, [dispatch, newsUrl]);

  // const navigate = useNavigate();
  // const location = useLocation();

  let bannerSrc = defaultBanner;
  let articleId = 0;
  if (article) {
    bannerSrc = article.coverPicture ?? defaultBanner;
    articleId = article._id;
  }

  useEffect(() => {
    articleId && dispatch(getCommentsByArticleId({ articleId }));
  }, [articleId, dispatch]);
  // const handleUserKeyPress = useCallback(
  //   (e) => {
  //     if (e.target.tagName === "IMG" && e.target.id !== "previewImg") {
  //       const imageSrc = e.target.getAttribute("src");
  //       const params = new URLSearchParams({ src: imageSrc });
  //       navigate(`/image?${params}`, {
  //         state: { background: location },
  //       });
  //     }
  //   },
  //   [location, navigate]
  // );

  // useEffect(() => {
  //   window.addEventListener("click", handleUserKeyPress);
  //   return () => {
  //     window.removeEventListener("click", handleUserKeyPress);
  //   };
  // }, [handleUserKeyPress]);

  if (loadingArticles) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    article &&
    comments && (
      <>
        <Container size="lg">
          <div className={s.containerBaner}>
            <div
              className={s.baner}
              style={{
                backgroundImage: `url(${bannerSrc})`,
              }}
            />
            <h1 className={s.title}>{article.title}</h1>
          </div>
        </Container>
        <Container>
          <Markdown>{article.content}</Markdown>
        </Container>
        <Container>
          <Typography
            variant="h6"
            sx={{ marginTop: "50px", color: "primary.main" }}
          >
            Коментарі
          </Typography>
          {userInfo ? <AddComment articleId={article._id} /> : <Message />}
          <CommentsList data={comments} />
        </Container>
      </>
    )
  );
}

export default Article;
