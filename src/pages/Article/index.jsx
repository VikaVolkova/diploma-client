import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import Container from "../../components/Container";
import s from "./index.module.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import defaultBanner from "./defaultBanner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleByUrl,
  toggleArticlePublish,
  removeArticle,
} from "../../features/article/articleActions";
import { getCommentsByArticleId } from "../../features/comments/commentsActions";
import { Typography } from "@mui/material";
import { CommentsList } from "../../components/CommentsList";
import AddComment from "../../components/AddComment";
import Message from "../../components/Message";
import ActionPanel from "../../components/ActionPanel";
import roles from "../../constants/roles";

function Article() {
  const { newsUrl } = useParams();
  const dispatch = useDispatch();
  const { article, loadingArticles } = useSelector((state) => state.article);
  const { comments } = useSelector((state) => state.comments);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArticleByUrl({ newsUrl }));
  }, [dispatch, newsUrl]);

  let bannerSrc = defaultBanner;
  let articleId = 0;
  if (article) {
    bannerSrc = article.coverImage ?? defaultBanner;
    articleId = article._id;
  }

  useEffect(() => {
    articleId && dispatch(getCommentsByArticleId({ articleId }));
  }, [articleId, dispatch]);

  if (loadingArticles) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const deleteArticle = async (id) => {
    await dispatch(removeArticle({ id }));
    navigate(-1);
  };

  const publishArticle = async (id) => {
    const isPublished = true;
    await dispatch(toggleArticlePublish({ id, isPublished }));
    navigate(-1);
  };

  const unpublishArticle = async (id) => {
    const isPublished = false;
    await dispatch(toggleArticlePublish({ id, isPublished }));
    navigate(-1);
  };

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
          {userInfo && [roles.admin, roles.manager].includes(userInfo.role) && (
            <ActionPanel
              handleEdit={
                userInfo?._id === article.author ||
                userInfo?.role === roles.admin
                  ? () => navigate(`/update/${article._id}`)
                  : undefined
              }
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
              handleDelete={
                userInfo?._id === article.author ||
                userInfo?.role === roles.admin
                  ? () => deleteArticle(article._id)
                  : undefined
              }
            />
          )}
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
          {userInfo ? (
            <AddComment articleId={article._id} />
          ) : (
            <Message
              text="Тільки зареєстровані користувачі можуть залишати повідомлення.
          Будь-ласка зайдіть або зареєструйстесь."
              type="login"
            />
          )}
          <CommentsList data={comments} />
        </Container>
      </>
    )
  );
}

export default Article;
