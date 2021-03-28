import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

import { addBookToCart, addAmountOfBook, deleteBook } from '../../redux/actions';
import './Cart.scss';

function Cart() {
  const [isLastBook, setIsLastBook] = useState(false);
  const dispatch = useDispatch();
  const reducerBooks = useSelector((state) => state.cartReducer.books);
  const localStBooks = JSON.parse(localStorage.getItem('selectedBooks'));
  const books = useSelector((state) => state.cartReducer.books) || JSON.parse(localStorage.getItem('selectedBooks')) || [];
  const [isBooks, setIsBooks] = useState(false);
  const totalPrice = books.length ? parseFloat(books.map((book) => book.price * book.orderedCount).reduce((acc, cur) => acc + cur)).toFixed(2) : 0;

  // for saving on reload
  useEffect(() => {
    if (!reducerBooks.length && localStBooks.length) {
      if (JSON.parse(localStorage.getItem('isLastBookToDelete'))) localStorage.setItem('selectedBooks', '[]');
      JSON.parse(localStorage.getItem('selectedBooks')).forEach((book) => dispatch(addBookToCart(book)));
    }
  });

  useEffect(() => {
    localStorage.setItem('isLastBookToDelete', 'false');
    JSON.stringify(localStorage.setItem('selectedBooks', JSON.stringify(books)));
    if (books.length) setIsBooks(false);
    if (!books.length) setIsBooks(true);
  }, [reducerBooks]);

  const onBookAmountCange = (ev, id, defaultAmount, available) => {
    const { value } = ev.target;
    const changedAmount = +value - +defaultAmount;
    if (+value === 0) {
      dispatch(deleteBook(id));
      localStorage.setItem('isLastBookToDelete', reducerBooks.length === 1 ? 'true' : 'false');
      return;
    }
    if (+value === +defaultAmount) return;
    dispatch(addAmountOfBook(id, changedAmount));
  };

  const cartContent = (cartBooks, handler) => {
    if (!cartBooks.length) {
      return (
        <div className="empty-cart__container">
          <div className="empty-cart__wrapper">
            <i className="cart teal huge plus icon" />
            <h3>Cart empty</h3>
          </div>
        </div>
      );
    }
    return (
      <div className="cart__container">
        <div className="cart-table">
          <table className="ui celled table">
            <thead>
              <tr>
                <th className="name-colomn">Name</th>
                <th>Count</th>
                <th>Price</th>
                <th className="total-colomn">Total</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                return (
                  <tr className="cart-row" key={book.id}>
                    <td data-label="name">{book.title}</td>
                    <td data-label="count">
                      <input
                        type="number"
                        id="tentacles"
                        name="tentacles"
                        min={0}
                        max={book.availableCount}
                        defaultValue={book.orderedCount}
                        onChange={(ev) => handler(ev, book.id, book.orderedCount, book.availableCount)}
                      />
                    </td>
                    <td data-label="price">{book.price}</td>
                    <td data-label="total" className="totals-wrapper">
                      {parseFloat(book.price * book.orderedCount).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <span className="cart-total">{`Total Price -  ${totalPrice} $`}</span>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="ui container cart-wrapper">
        <button className="ui button small teal purchase-btn" type="button" disabled={isBooks}>Purchase</button>
        <div className="">
          {cartContent(books, onBookAmountCange)}
        </div>
      </div>
    </>
  );
}

export default Cart;
