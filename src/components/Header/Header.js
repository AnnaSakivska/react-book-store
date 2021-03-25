import React from 'react';
import { useDispatch } from 'react-redux';

import './Header.scss';
import { logOut } from '../../redux/actions';

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logOut());
  const userName = JSON.parse(localStorage.getItem('user')).username.charAt(0).toUpperCase()
    + JSON.parse(localStorage.getItem('user')).username.slice(1);

  return (
    <div className="ui container header-wrapper">
      <div className="header">
        <span className="user-name">{userName}</span>
        <button className="ui button teal" type="button" onClick={handleLogout}>Log out</button>
      </div>
      <hr className="line-division" />
      <div className="header-cart">
        <h1>JS Band Store</h1>
        <div className="cart-wrapper">
          <i className="cart teal large plus icon" />
          <span>3</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
