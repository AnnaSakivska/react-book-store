import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Header.scss';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/actions';

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logOut());
  const { cartReducer } = useSelector((state) => state);
  const userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username.charAt(0).toUpperCase()
    + JSON.parse(localStorage.getItem('user')).username.slice(1) : '';
  if (cartReducer.books.length) localStorage.setItem('selectedBooks', cartReducer.books.length ? JSON.stringify(cartReducer.books) : []);
  const totalItems = localStorage.getItem('selectedBooks') ? JSON.parse(localStorage.getItem('selectedBooks')) : [];

  return (
    <div className="ui container header-wrapper">
      <div className="header">
        <span className="user-name">{userName}</span>
        <button className="ui button teal" type="button" onClick={handleLogout}>Log out</button>
      </div>
      <hr className="line-division" />
      <div className="header-cart">
        <h1>JS Band Store</h1>
        <Link to="/cart">
          <div className="cart-wrapper">
            <i className="cart teal large plus icon" />
            <span>{totalItems.length ? totalItems.map((item) => +item.orderedCount).reduce((acc, cur) => acc + cur) : 0}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
