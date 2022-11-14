import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import QueryHandler from "../../api";
import { LoadMoreContent } from "../../components/LoadMoreContent";
import { ArticleList } from "../../components/ArticleList";

function Category() {
  const { categoryUrl } = useParams();

  const memoizedCategory = useCallback(
    () => QueryHandler.fetchArticlesByCategoryUrl(categoryUrl),
    [categoryUrl]
  );

  return (
    <Container>
      <LoadMoreContent request={memoizedCategory} render={ArticleList} />
    </Container>
  );
}

export default Category;
