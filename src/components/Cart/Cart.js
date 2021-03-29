import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../Header/Header';

import { addBookToCart, addAmountOfBook, deleteBook, deleteAllBooks } from '../../redux/actions';
import PurchaseModal from '../PurchaceModal/PurchaseModal';
import './Cart.scss';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

function Cart() {
  const [isPurchase, setIsPurchase] = useState(false);
  const [purchaseMsg, setPurchaseMsg] = useState('');
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState('');
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
  }, []);

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

  const onClearCart = () => {
    localStorage.setItem('selectedBooks', '[]');
    dispatch(deleteAllBooks());
  };

  const purchaseHandler = async (booksToPurchase) => {
    const idAndCountArr = booksToPurchase.map((book) => [book.id, book.orderedCount]);
    const headers = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` };
    const idArr = [];
    idAndCountArr.forEach((bookInfo) => {
      for (let i = 0; i < +bookInfo[1]; i++) {
        idArr.push(bookInfo[0]);
      }
    });

    try {
      setIsPurchaseLoading(true);
      const res = await axios.post('/purchase', { books: [idArr.join()] }, { headers });
      const { data } = res;
      setPurchaseMsg(data.message);
      setIsPurchase(true);
    } catch (error) {
      setIsPurchaseLoading(true);
      setPurchaseError(JSON.stringify(error.message));
    } finally {
      setIsPurchaseLoading(false);
    }
  };

  const cartContent = (cartBooks, handler) => {
    if (isPurchaseLoading) return <Spinner />;
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
      <>
        {purchaseError ? <ErrorMessage errorMsg={purchaseError} /> : ''}
        <div className="cart__container">
          <div className="cart-table">
            <table className="ui celled table">
              <thead>
                <tr>
                  <th className="name-colomn">Name</th>
                  <th>Count</th>
                  <th>Price</th>
                  <th className="total-colomn">
                    <span>Total</span>
                    <div className="tooltip">
                      <button type="button" onClick={onClearCart}>
                        <i className="close inverted black icon" />
                      </button>
                      <span className="tooltiptext">Clear cart</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  return (
                    <tr className="cart-row" key={book.id}>
                      <td data-label="name">{book.title}</td>
                      <td data-label="count">
                        <input
                          className="count-input"
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
      </>
    );
  };

  return (
    <>
      <Header />
      <div className="ui container cart-wrapper">
        <button className="ui button small teal purchase-btn" type="button" disabled={isBooks} onClick={() => purchaseHandler(books)}>Purchase</button>
        <div className="">
          {cartContent(books, onBookAmountCange)}
        </div>
      </div>
      <PurchaseModal purchaseMsg={purchaseMsg} trigger={isPurchase} setTrigger={setIsPurchase} onClearCart={onClearCart} reducerBooks={reducerBooks}>
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
                  <td data-label="count">{book.orderedCount}</td>
                  <td data-label="price">{book.price}</td>
                  <td data-label="total" className="totals-wrapper">
                    {parseFloat(book.price * book.orderedCount).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <span className="puchase-total">{`Total Price -  ${totalPrice} $`}</span>
      </PurchaseModal>
    </>
  );
}

export default Cart;
