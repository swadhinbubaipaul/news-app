import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { articles: [], page: 1, totalArticles: 0 };
    document.title = `${capitaliZeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  updateNews = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
    });
    this.props.setProgress(100);
  };

  componentDidMount = async () => {
    this.updateNews();
  };

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${
      process.env.REACT_APP_API_KEY
    }&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top {capitaliZeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={
            Math.ceil(this.state.totalArticles / this.props.pageSize) !==
            this.state.page
          }
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {this.state.articles.map((element) => {
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
  }
}

const capitaliZeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
