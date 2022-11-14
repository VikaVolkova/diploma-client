import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import QueryHandler from "../../api";
import Container from "../../components/Container";
import s from "./index.module.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import defaultBanner from "./defaultBanner.jpg";
// import roles from "../../constants/roles";
// import useAuth from "../../useAuth";
import { Typography } from "@mui/material";
// import AddComment from "../../components/AddComment";
// import Message from "../../components/Message";
// import ActionPanel from "../../components/ActionPanel";
import { LoadMoreContent } from "../../components/LoadMoreContent";
import { CommentsList } from "../../components/CommentsList";

function Article() {
  //   const { user } = useAuth();
  const { newsUrl } = useParams();
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    QueryHandler.fetchArticleByUrl(newsUrl).then((data) => {
      setPost(data);
      setIsLoading(false);
    });
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const bannerSrc = post.coverPicture ?? defaultBanner;
  const handleUserKeyPress = useCallback((e) => {
    if (e.target.tagName === "IMG" && e.target.id !== "previewImg") {
      const imageSrc = e.target.getAttribute("src");
      const params = new URLSearchParams({ src: imageSrc });
      navigate(`/image?${params}`, {
        state: { background: location },
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleUserKeyPress);
    return () => {
      window.removeEventListener("click", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  //   const deleteArticle = async (articleId) => {
  //     QueryHandler.deleteArticle(articleId);
  //     navigate(-1);
  //   };

  //   const publishArticle = async (articleId) => {
  //     QueryHandler.publishArticle(articleId, true);
  //     navigate(-1);
  //   };

  //   const unpublishArticle = async (articleId) => {
  //     QueryHandler.publishArticle(articleId, '');
  //     navigate(-1);
  //   };

  return (
    <>
      <Container size="lg">
        <div className={s.containerBaner}>
          <div
            className={s.baner}
            style={{
              backgroundImage: `url(${bannerSrc})`,
            }}
          />
          <h1 className={s.title}>{post.title}</h1>
        </div>
        {/* {user && [roles.admin, roles.manager].includes(user.role) && (
          <ActionPanel
            handleEdit={
              user?.id === post.userId || user?.role === roles.admin
                ? () => navigate(`/update/${post.id}`)
                : undefined
            }
            handlePublish={
              user?.role === roles.admin && !post.published
                ? () => publishArticle(post.id)
                : undefined
            }
            handleUnpublish={
              user?.role === roles.admin && post.published
                ? () => unpublishArticle(post.id)
                : undefined
            }
            handleDelete={
              user?.id === post.userId || user?.role === roles.admin
                ? () => deleteArticle(post.id)
                : undefined
            }
          />
        )} */}
      </Container>
      <Container>
        <Markdown>{post.content}</Markdown>
      </Container>
      <Container>
        <Typography
          variant="h6"
          sx={{ marginTop: "50px", color: "primary.main" }}
        >
          Comments
        </Typography>
        {/* {user ? <AddComment articleId={post.id} /> : <Message />} */}
        <LoadMoreContent
          request={() => QueryHandler.fetchCommentsByArticleId(post._id)}
          render={CommentsList}
        />
      </Container>
    </>
  );
}

export default Article;
