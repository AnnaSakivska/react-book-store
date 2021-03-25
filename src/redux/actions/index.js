/* eslint-disable quotes */
import axios from 'axios';

// Authorizaiton actions
const AuthActionType = {
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL',
  SHOW_LOADER: 'SHOW_LOADER',
  HIDE_LOADER: 'HIDE_LOADER'
};

const RegisterAuthAction = (userName) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const res = await axios.post('/signin', { username: userName });
      const { data } = res;
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'REGISTER_FAIL', payload: error });
    } finally {
      dispatch(hideLoader());
    }
  };
};

const setUser = (data) => ({
  type: 'SET_USER',
  payload: data
});

const logOut = () => {
  localStorage.removeItem('user');
  return {
    type: 'LOG_OUT'
  };
};

// Books actions
const BooksType = {
  GET_BOOKS_SUCC: 'GET_BOOKS_SUCC',
  GET_BOOKS_FAIL: 'GET_BOOKS_FAIL',
  SHOW_LOADER: 'SHOW_LOADER',
  HIDE_LOADER: 'HIDE_LOADER'
};

const initialUserToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';

const getBooks = (token = initialUserToken || '') => {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      const res = await axios.get('/books', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = res;
      dispatch({ type: 'GET_BOOKS_SUCC', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_BOOKS_FAIL', payload: {} });
    } finally {
      dispatch(hideLoader());
    }
  };
};

const showLoader = () => (dispatch) => {
  dispatch({
    type: 'SHOW_LOADER'
  });
};

const hideLoader = () => (dispatch) => {
  dispatch({
    type: 'HIDE_LOADER'
  });
};

export {
  RegisterAuthAction, AuthActionType, setUser, logOut, BooksType, getBooks
};
