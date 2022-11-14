import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import QueryHandler from "../../api";
import ArticleList from "../../components/ArticleList";

function Category() {
  const { categoryUrl } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    QueryHandler.fetchArticlesByCategoryUrl(categoryUrl).then((data) => {
      setArticles(data?.articles ?? []);
    });
  }, [categoryUrl]);

  return (
    <Container>
      <ArticleList articles={articles} />
    </Container>
  );
}

export default Category;
