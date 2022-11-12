import React from "react";
import PropTypes from "prop-types";
import Preview from "../Preview";
import { Grid } from "@mui/material";
import articlePropType from "../../proptypes/article";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function ArticleList({ articles }) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container direction="column">
      {articles.map((article) => (
        <Grid item key={article.id} marginBottom={5}>
          <Preview article={article} type={isTablet ? "thumbnail" : "full"} />
        </Grid>
      ))}
    </Grid>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(articlePropType)).isRequired,
};

export default ArticleList;
