import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ setProgress, apiKey, pageSize, country, category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `${capitaliZeFirstLetter(category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [category]);

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    setProgress(30);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setProgress(70);
    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${
      page + 1
    }&pageSize=${pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "85px" }}
      >
        NewsMonkey - Top {capitaliZeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {articles.map((element) => {
              return (
                <div className="my-3" key={element.url}>
                  <NewsItem
                    title={
                      element.title
                        ? element.title.length > 45
                          ? element.title.slice(0, 45).concat("...")
                          : element.title
                        : ""
                    }
                    description={
                      element.description
                        ? element.description.length > 88
                          ? element.description.slice(0, 88).concat("...")
                          : element.description
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG3WIRrUFid1AWw0s0kyPN1dMXqQjx-Ujcgg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

const capitaliZeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default News;
