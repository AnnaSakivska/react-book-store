import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Header.scss';
import { Link, useHistory } from 'react-router-dom';
import { logOut } from '../../redux/actions';

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logOut());
  const { location } = useHistory();
  const { cartReducer } = useSelector((state) => state);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const userName = localStorage.getItem('user') ? userInfo.username.charAt(0).toUpperCase()
    + userInfo.username.slice(1) : '';
  if (cartReducer.books.length) localStorage.setItem('selectedBooks', cartReducer.books.length ? JSON.stringify(cartReducer.books) : []);
  const totalItems = localStorage.getItem('selectedBooks') ? JSON.parse(localStorage.getItem('selectedBooks')) : [];

  return (
    <div className="ui container header-wrapper">
      <div className="header">
        {location.pathname === '/bookscatalog' ? '' : (
          <Link to="/bookscatalog">
            <button className="ui small button teal to-catalog-btn" type="button">Back to Catalog</button>
          </Link>
        )}
        <div className="user-info">
          <img className="ui circular image" src={userInfo.avatar} alt="avatar" />
          <span className="user-name">{userName}</span>
          <button className="ui button teal" type="button" onClick={handleLogout}>Log out</button>
        </div>
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
