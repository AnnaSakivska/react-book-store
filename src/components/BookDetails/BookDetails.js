import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import './BookDetails.scss';
import Header from '../Header/Header';
import AmountPriceCard from '../AmoutPriceCard/AmountPriceCard';
import { getBooks } from '../../redux/actions';
import Spinner from '../Spinner';

function BookDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userToken = JSON.parse(localStorage.getItem('user')).token;
  const { booksReducer } = useSelector((state) => state);

  useEffect(() => {
    if (!booksReducer.books.length) {
      dispatch(getBooks(userToken));
    }
  }, []);

  const searchBook = (reducer, token) => {
    if (reducer.books.length === 0 || reducer.loading) return <Spinner />;
    if (reducer.books.length) {
      const { author, count, cover, description, level, price, tags, title } = reducer.books.find((book) => book.id === id);
      return (
        <>
          <div className="book-details">
            <div className="book-img__wrapper">
              <img className="ui medium rounded image" src={cover} alt="book cover" />
              <p className="book-description">{description}</p>
            </div>
            <div>
              <h3 className="book-title">{title}</h3>
              <span className="book-author">{author}</span>
              <div className="book-tag">
                <i className="tags icon" />
                {tags.map((tag) => <span key={Math.random(10)}>{`${tag.slice(0, 1).toUpperCase() + tag.slice(1)}, `}</span>)}
                <span>{level}</span>
              </div>
            </div>
          </div>
          <AmountPriceCard id={id} title={title} availableCount={count} price={price} />
        </>
      );
    }
  };

  return (
    <>
      <div className="ui container">
        <Header />
        <div className="details-wrapper">
          {searchBook(booksReducer, userToken)}
        </div>
      </div>
    </>
  );
}

export default BookDetails;
