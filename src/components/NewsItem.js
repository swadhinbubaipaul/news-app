const NewsItem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
}) => {
  return (
    <div className="card" style={{ width: "20rem", margin: "auto" }}>
      <img
        src={imageUrl}
        referrerPolicy="no-referrer"
        className="card-img-top"
        alt="..."
        onError={handleImgError}
      />
      <div className="card-body pt-2">
        <span className="badge rounded-pill text-bg-primary mb-1">
          {source}
        </span>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-body-secondary">
            By
            {author ? ` ${author}` : " Unknown"} <br />
            {date ? `On ${new Date(date).toLocaleString()}` : ""}
          </small>
        </p>
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
};

const handleImgError = (e) => {
  e.target.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG3WIRrUFid1AWw0s0kyPN1dMXqQjx-Ujcgg";
};

export default NewsItem;
