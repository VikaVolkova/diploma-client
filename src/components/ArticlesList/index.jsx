import React, { useEffect, useState } from "react";
import Preview from "../Preview";
import s from "./index.module.css";
import { Box, CircularProgress, Button } from "@mui/material";
import PropTypes from "prop-types";
// import QueryHandler from "../../api";
import unionBy from "lodash.unionby";
// import useAuth from "../../useAuth";
// import roles from "../../constants/roles";
// import { useNavigate } from "react-router-dom";
// import ActionPanel from "../ActionPanel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const count = 2;
function ArticlesList({ loadData, type }) {
  const [cursor, setCursor] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleError = () => {};
  // const { user } = useAuth();
  // const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const onLoading = async () => {
    setIsLoading(true);
    try {
      const articlesList = await loadData(cursor, count);
      const newCursor = cursor + count;
      setArticles((prevArticles) =>
        unionBy(prevArticles, articlesList.articles, "_id")
      );
      setCursor(newCursor);
      if (newCursor >= articlesList.count) {
        setShowLoadMore(false);
      }
      console.log(articles);
    } catch (e) {
      handleError(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    onLoading();
    // eslint-disable-next-line
  }, []);

  // const updateArticlesList = (articleId) => {
  //   const newArticles = articles.filter(({ id }) => id !== articleId);
  //   setArticles(newArticles);
  // };

  // const publishArticle = async (articleId) => {
  //   QueryHandler.publishArticle(articleId, true).then(() =>
  //     updateArticlesList(articleId)
  //   );
  // };

  // const unpublishArticle = async (articleId) => {
  //   QueryHandler.publishArticle(articleId, "").then(() =>
  //     updateArticlesList(articleId)
  //   );
  // };

  // const deleteArticle = async (articleId) => {
  //   QueryHandler.deleteArticle(articleId).then(() =>
  //     updateArticlesList(articleId)
  //   );
  // };

  return (
    <>
      <ul>
        {articles.map((article) => (
          <li className={s.newsItem} key={article._id}>
            <Preview article={article} type={isTablet ? "thumbnail" : "full"} />
            {/* {type === "unpublished" && (
              <>
                {[roles.admin, roles.manager].includes(user.role) && (
                  <ActionPanel
                    handleEdit={() => navigate(`/update/${article.id}`)}
                    handlePublish={
                      user?.role === roles.admin && !article.published
                        ? () => publishArticle(article.id)
                        : undefined
                    }
                    handleUnpublish={
                      user?.role === roles.admin && article.published
                        ? () => unpublishArticle(article.id)
                        : undefined
                    }
                    handleDelete={() => deleteArticle(article.id)}
                  />
                )}
              </>
            )} */}
          </li>
        ))}
      </ul>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        showLoadMore && (
          <div className={s.customButton}>
            <Button
              variant="outlined"
              size="large"
              onClick={onLoading}
              sx={{
                width: 460,
                height: 60,
              }}
            >
              LOAD MORE NEWS
            </Button>
          </div>
        )
      )}
    </>
  );
}

ArticlesList.propTypes = {
  loadData: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default ArticlesList;
