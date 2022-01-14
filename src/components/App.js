import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {
  HashRouter as Rounter, Route, Switch, Redirect
} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import BooksCatalog from './BooksCatalog/BooksCatalog';

import LogIn from './LogIn/LogIn';
import './App.scss';
// import Header from './Header/Header';
import BookDetails from './BookDetails/BookDetails';
// import Cart from './Cart/Cart';
import ScrollToTop from './ScrollToTop';
// import NotFound from './NotFound';

const App = observer(({ stores }) => {
  const isUserAlreadyLoggedIn = !!JSON.parse(localStorage.getItem('user'))?.token || stores.authStore.isLoggedIn;

  return (
    <div>
      <Rounter>
        <ScrollToTop />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (isUserAlreadyLoggedIn ? <Redirect to="/bookscatalog" /> : <Redirect to="/login" />)}
          />
          <Route
            path="/login"
            exact
            render={() => (isUserAlreadyLoggedIn ? <Redirect to="/bookscatalog" /> : <LogIn />)}
          />
          <Route
            path='/bookscatalog'
            exact
            render={() => (isUserAlreadyLoggedIn ? <BooksCatalog /> : <Redirect to='/login' />)}
          />
          <Route />
          <Route
            path='/book-details/:id'
            exact
            render={() => (isUserAlreadyLoggedIn ? <BookDetails /> : <Redirect to='/login' />)}
          />
        </Switch>
      </Rounter>
    </div>
  );
});

export default inject('stores')(App);

// {/*<Route*/}
// {/*  path='/bookscatalog'*/}
// {/*  exact*/}
// {/*  render={() => (authorReducer.user.token ? <BooksCatalog /> : <Redirect to='/login' />)}*/}
// {/*/>*/}
// {/*<Route*/}
// {/*  path='/book-details/:id'*/}
// {/*  exact*/}
// {/*  render={() => (authorReducer.user.token ? <BookDetails /> : <Redirect to='/login' />)}*/}
// {/*/>*/}
// {/*<Route*/}
// {/*  path='/cart'*/}
// {/*  exact*/}
// {/*  render={() => (authorReducer.user.token ? <Cart /> : <Redirect to='/login' />)}*/}
// {/*/>*/}
// {/*<Route exact path='*' component={NotFound} />*/}
