import React, { useEffect } from "react";
import Preview from "../Preview";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import QueryHandler from "../../api";
// import roles from '../../constants/roles';
// import ActionPanel from '../ActionPanel';
// import useAuth from '../../useAuth';
// import { useNavigate } from 'react-router-dom';
import { useLoading } from "../../useLoading";

export const ArticleList = ({ data, type, removeItem }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const getArticles = useLoading(QueryHandler.unpubshishedComments);
  // const { user } = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    getArticles.onLoading();
  }, []);

  // const publishArticle = async (id) => {
  //   try {
  //     await QueryHandler.publishArticle(id, 'true');
  //     removeItem(id);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const unpublishArticle = async (id) => {
  //   try {
  //     await QueryHandler.publishArticle(id, '');
  //     removeItem(id);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const deleteArticle = async (id) => {
  //   try {
  //     await QueryHandler.deleteArticle(id);
  //     removeItem(id);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  return data.map((article) => (
    <Grid item key={article._id} marginBottom={5}>
      <Preview article={article} type={isTablet ? "thumbnail" : "full"} />
      {/* {type === 'unpublished' && (
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
    </Grid>
  ));
};
