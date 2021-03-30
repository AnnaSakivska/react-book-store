import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AmountPriceCard.scss';
import { addBookToCart, addAmountOfBook } from '../../redux/actions';

// eslint-disable-next-line react/prop-types
function AmountPriceCard({ id, title, availableCount, price }) {
  const [bookCount, setbookCount] = useState(0);
  const [AddToCart, setAddToCart] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [warningMsg, setWarningMsg] = useState('');
  const dispatch = useDispatch();
  const cart = { id, title, orderedCount: bookCount, price, availableCount };
  const { cartReducer } = useSelector((state) => state);
  const chosenBookInArray = cartReducer.books.filter((item) => item.id === id).length;

  const countAvailAmountOfBook = (initAmount) => {
    if (cartReducer.books.length && chosenBookInArray) return +initAmount - +cartReducer.books.filter((item) => item.id === id)[0].orderedCount;
    return initAmount;
  };

  const onAmountOfBookChange = (ev) => {
    setWarningMsg('');
    setbookCount(ev.target.value);
    setDisabledBtn(false);
  };

  const addToCartHandler = (ev) => {
    if (+bookCount === 0 && +countAvailAmountOfBook(availableCount) > 0) setWarningMsg('Please, add copies!');
    setAddToCart(true);
    setDisabledBtn(true);
  };

  useEffect(() => {
    document.getElementById('tentacles').value = 0;
    document.getElementById('total-price').innerText = 0;

    if (+countAvailAmountOfBook(availableCount) === 0) setWarningMsg('No available copies!');
    // in case page was reloaded
    if (localStorage.getItem('selectedBooks') && !cartReducer.books.length) {
      JSON.parse(localStorage.getItem('selectedBooks')).forEach((book) => {
        dispatch(addBookToCart(book));
      });
    }
    if (AddToCart) {
      if (!cartReducer.books.length || !chosenBookInArray) dispatch(addBookToCart(cart));
      if (cartReducer.books.length && chosenBookInArray) dispatch(addAmountOfBook(id, bookCount));
    }
    setAddToCart(false);
  }, [AddToCart]);

  return (
    <div>
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="price-per-one price-row">
              <span>Price, $</span>
              <span>{price}</span>
            </div>
            <div className="price-row">
              <span>Cart</span>
              <input
                type="number"
                id="tentacles"
                name="tentacles"
                min="0"
                max={countAvailAmountOfBook(availableCount)}
                defaultValue="0"
                onChange={(ev) => onAmountOfBookChange(ev)}
                onKeyDown={(ev) => ev.preventDefault()}
              />
            </div>
            <div className="price-row">
              <span>Total Price, $</span>
              <span id="total-price">{Math.round((bookCount * price) * 100) / 100}</span>
            </div>
            <div className="add-to-card">
              <span id="warning-for-btn">{warningMsg}</span>
              <button className="ui button mini teal" type="button" onClick={(ev) => addToCartHandler(ev)} disabled={disabledBtn}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmountPriceCard;
