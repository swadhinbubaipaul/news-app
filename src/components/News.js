import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor() {
    super();
    console.log("Hello I am a constructor from News Component");
    this.state = { articles: [], loading: false, page: 1, totalArticles: 0 };
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  handlePreviousClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${
      process.env.REACT_APP_API_KEY
    }&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    console.log("next");
    if (
      Math.ceil(this.state.totalArticles / this.props.pageSize) >
      this.state.page
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${
        process.env.REACT_APP_API_KEY
      }&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top headlines</h1>
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-3" key={element.url}>
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
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page === 1}
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              Math.ceil(this.state.totalArticles / this.props.pageSize) <=
              this.state.page
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
