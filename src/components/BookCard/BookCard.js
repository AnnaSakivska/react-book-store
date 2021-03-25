import React from 'react';

function BookCard({
  // eslint-disable-next-line react/prop-types
  title, author, price, cover, id
}) {
  return (
    <div className="teal card" key={id}>
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
            <button className="ui button teal" type="button">View</button>
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
