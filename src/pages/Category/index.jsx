import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { ArticleList } from "../../components/ArticleList";

function Category() {
  const { categoryUrl } = useParams();
  const [category, setCategory] = useState(categoryUrl);

  useEffect(() => {
    setCategory(categoryUrl);
  }, [categoryUrl]);

  return (
    <Container>
      <ArticleList page="category" categoryUrl={category} />
    </Container>
  );
}

export default Category;
