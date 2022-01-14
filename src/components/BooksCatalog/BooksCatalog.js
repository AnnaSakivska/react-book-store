import React, { useState, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
// import { useDispatch, useSelector } from 'react-redux';

import './BooksCatalog.scss';
import Header from '../Header/Header';
import SearchBar from '../SearchBar';
import BookCard from '../BookCard/BookCard';
import Spinner from '../Spinner';
import FilterBooks from '../FilterBooks/FilterBooks';
import ErrorMessage from '../ErrorMessage';

const BooksCatalog = observer(({ stores }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrice, setFilterPrice] = useState({ min: 0, max: Infinity });
  const userToken = JSON.parse(localStorage.getItem('user')).token;
  const [booksData, setBooksData] = useState({
    books: [],
    isLoading: true,
    error: ''
  });

  const fetchBooks = useCallback(async() => {
    await stores.booksStore.fetchBooks(userToken);
    setBooksData(prevState => {
      return {
        ...prevState,
        books: stores.booksStore.getBooks(),
        isLoading: stores.booksStore.getLoading(),
        error: stores.booksStore.getErrors()
      }
    })

    return stores.booksStore.getBooks();
  }, [userToken]);

  useEffect(() => {
    const data = fetchBooks();
  }, [fetchBooks]);

  function searchBooks (value, chosenPrice) {
    const searchValue = value.books.length ? value.books.filter((book) => (book.price > chosenPrice.min && book.price < chosenPrice.max)
      && book.title.toLowerCase().includes(searchTerm.toLowerCase())) : value.books;

    if (value.isLoading) return <Spinner />;
    if (searchValue.length === 0 && !value.error) return <h1>No books related to this theme!</h1>;
    if (value.error) return <ErrorMessage errorMsg={value.error.message} />;
    return (
      searchValue.map(({ title, author, price, cover, id }) => {
        return (
          <BookCard
            key={id}
            title={title}
            author={author}
            price={price}
            cover={cover}
            id={id}
          />
        );
      })
    );
  }

  return (
    <>
      <Header />
      <div className="ui container">
        <div className="ui segment search-wrapper">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterBooks filterPrice={filterPrice} setFilterPrice={setFilterPrice} />
        </div>
        <div className="ui link cards cards__container">
          {searchBooks(booksData, filterPrice)}
        </div>
      </div>
    </>
  );
});

export default inject('stores')(BooksCatalog);

