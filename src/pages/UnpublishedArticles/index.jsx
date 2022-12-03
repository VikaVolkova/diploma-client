import React from "react";
import Container from "../../components/Container";
import { ArticleList } from "../../components/ArticleList";

function UnpublishedArticles() {
  return (
    <Container>
      <ArticleList page="unpublished" />
    </Container>
  );
}

export default UnpublishedArticles;
