import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './BooksCatalog.scss';
// import InfiniteScroll from 'react-infinite-scroller';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import { getBooks } from '../../redux/actions';
import BookCard from '../BookCard/BookCard';
import Spinner from '../Spinner';
import FilterBooks from '../FilterBooks/FilterBooks';

function BooksCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrice, setFilterPrice] = useState({ min: 0, max: Infinity });
  const [noBooks, setNoBooks] = useState('');
  const dispatch = useDispatch();
  const userToken = JSON.parse(localStorage.getItem('user')).token;
  const { booksReducer } = useSelector((state) => state);

  useEffect(() => { dispatch(getBooks(userToken)); }, []);

  const searchBooks = (value, chosenPrice) => {
    const searchValue = value.books.filter((book) => (book.price > chosenPrice.min && book.price < chosenPrice.max)
      && book.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (value.loading) return <Spinner />;
    if (searchValue.length === 0) return <h1>No books related to this theme!</h1>;
    return (
      searchValue.map(({ title, author, price, cover, id }) => {
        return (
          <BookCard
            title={title}
            author={author}
            price={price}
            cover={cover}
            key={id}
          />
        );
      })
    );
  };

  return (
    <>
      <Header />
      <div className="ui container">
        <div className="ui segment search-wrapper">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterBooks filterPrice={filterPrice} setFilterPrice={setFilterPrice} />
        </div>
        <div className="ui link cards cards__container">
          {searchBooks(booksReducer, filterPrice)}
        </div>
      </div>
    </>
  );
}

export default BooksCatalog;

// author: "JuanMa Garrido"
// count: 13
// cover: "https://jsbooks.revolunet.com/img/cover-apuntes-javascript-intermedio.png"
// description: "(En Castellano) Revision de conceptos (actuales) de javascript desde
// basicos hasta un nivel intermedio"
// id: "1"
// level: "Intermediate"
// price: 40
// tags: ["core"]
// title: "Apuntes de Javascript I - Nivel Intermedio"
