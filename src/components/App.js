import React, { useEffect } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import BooksCatalog from './BooksCatalog/BooksCatalog';

import LogIn from './LogIn/LogIn';
import './App.scss';

const App = () => {
  const { authorReducer } = useSelector((state) => {
    // console.log(state);
    return state;
  });

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (authorReducer.user && authorReducer.user.token ? <Redirect to="/bookscatalog" /> : <Redirect to="/login" />)}
          />
          <Route
            path="/login"
            exact
            render={() => (authorReducer.user && authorReducer.user.token ? <Redirect to="/bookscatalog" /> : <LogIn />)}
          />
          <Route
            path="/bookscatalog"
            exact
            render={() => (authorReducer.user && authorReducer.user.token ? <BooksCatalog /> : <Redirect to="/login" />)}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
