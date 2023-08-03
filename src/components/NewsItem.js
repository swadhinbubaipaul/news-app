import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className="card" style={{ width: "18rem", margin: "auto" }}>
        <img
          height={"150px"}
          src={imageUrl}
          referrerPolicy="no-referrer"
          className="card-img-top"
          alt="..."
          onError={handleImgError}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

const handleImgError = (e) => {
  e.target.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG3WIRrUFid1AWw0s0kyPN1dMXqQjx-Ujcgg";
};
