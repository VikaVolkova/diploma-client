import React from "react";
import Container from "../../components/Container";
// import ArticleListTop from '../../components/ArticleListTop';
import ArticlesList from "../../components/LoadMoreNews";
import QueryHandler from "../../api";

function Home() {
  return (
    <Container>
      {/* <ArticleListTop articles={[]} /> */}
      <ArticlesList loadData={QueryHandler.fetchArticles} />
    </Container>
  );
}

export default Home;
