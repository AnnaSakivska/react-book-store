import React from 'react';
import { useDispatch } from 'react-redux';

import './BooksCatalog.scss';
import { logout } from '../../redux/actions';

function BooksCatalog() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Books catalog is here!</h1>
      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default BooksCatalog;
