import React from "react";
import Container from "../../components/Container";
// import ArticleListTop from '../../components/ArticleListTop';
import QueryHandler from "../../api";
import { LoadMoreContent } from "../../components/LoadMoreContent";
import { ArticleList } from "../../components/ArticleList";

function Home() {
  return (
    <Container>
      {/* <ArticleListTop articles={[]} /> */}
      <LoadMoreContent
        request={QueryHandler.fetchArticles}
        render={ArticleList}
      />
    </Container>
  );
}

export default Home;
