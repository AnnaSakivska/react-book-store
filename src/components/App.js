import React, { useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import BooksCatalog from './BooksCatalog/BooksCatalog';

import LogIn from './LogIn/LogIn';
import './App.scss';
import Header from './Header/Header';
import BookDetails from './BookDetails/BookDetails';

const App = () => {
  const { authorReducer, booksReducer } = useSelector((state) => state);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (authorReducer.user.token ? <Redirect to="/bookscatalog" /> : <Redirect to="/login" />)}
          />
          <Route
            path="/login"
            exact
            render={() => (authorReducer.user.token ? <Redirect to="/bookscatalog" /> : <LogIn />)}
          />
          {/* <Header /> */}
          <Route
            path="/bookscatalog"
            exact
            render={() => (authorReducer.user.token ? <BooksCatalog /> : <Redirect to="/login" />)}
          />
          <Route
            path="/book-details/:id"
            exact
            render={() => (authorReducer.user.token ? <BookDetails /> : <Redirect to="/login" />)}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
