import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function BookCard({ title, author, price, cover, id }) {
  return (
    <div key={id} className="teal card">
      <div className="image"><img src={cover} alt="book cover" /></div>
      <div className="content">
        <div className="header">{title}</div>
        <div className="description">
          {author}
        </div>
      </div>
      <div className="extra content">
        <span className="right floated">
          <div className="extra content">
            <Link to={`/book-details/${id}`}>
              <button className="ui button teal" type="button">View</button>
            </Link>
          </div>
        </span>
        <span>
          {`${price}$`}
        </span>
      </div>
    </div>
  );
}

export default BookCard;
