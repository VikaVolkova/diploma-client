import React from "react";
import Container from "../../components/Container";
import { ArticleList } from "../../components/ArticleList";

function Home() {
  return (
    <Container>
      <ArticleList page="main" />
    </Container>
  );
}

export default Home;
