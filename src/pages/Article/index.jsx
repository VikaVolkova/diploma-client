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

function Article() {
  const { newsUrl } = useParams();
  const dispatch = useDispatch();
  const { article, loading } = useSelector((state) => state.article);
  // dispatch(getArticleByUrl({ newsUrl }));

  useEffect(() => {
    dispatch(getArticleByUrl({ newsUrl }));
    // console.log("me");
  }, [dispatch, newsUrl]);

  // const navigate = useNavigate();
  // const location = useLocation();

  let bannerSrc = defaultBanner;
  if (article) {
    bannerSrc = article.coverPicture ?? defaultBanner;
  }
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    article && (
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
      </>
    )
  );
}

export default Article;
