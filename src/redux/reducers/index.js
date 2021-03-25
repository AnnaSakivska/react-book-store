import { combineReducers } from 'redux';
import { AuthActionType, BooksType } from '../actions';

// Authorization reducers
const emptyAuthState = {
  isLoggedIn: false,
  error: '',
  loading: false,
  user: {
    username: '',
    avatar: '',
    token: ''
  }
};

const authState = localStorage.getItem('user') ? {
  isLoggedIn: true,
  error: '',
  loading: false,
  user: JSON.parse(localStorage.getItem('user'))
} : emptyAuthState;

const authorReducer = (state = authState, action) => {
  switch (action.type) {
    case AuthActionType.SHOW_LOADER:
      return state;
    case AuthActionType.HIDE_LOADER:
      return state;
    case AuthActionType.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case AuthActionType.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: action.payload
      };
    case 'LOG_OUT':
      return emptyAuthState;
    default:
      return state;
  }
};

// Books reducers
const defaultBooksState = {
  books: [],
  loading: true
};

const booksReducer = (state = defaultBooksState, action) => {
  switch (action.type) {
    case BooksType.GET_BOOKS_SUCC:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case BooksType.SHOW_LOADER:
      return {
        ...state,
        loading: true
      };
    case BooksType.HIDE_LOADER:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

const setBooks = (books) => ({ type: BooksType.GET_BOOKS_SUCC, payload: books });

export default combineReducers({
  authorReducer,
  booksReducer,
  setBooks
});

// eslint-disable-next-line import/prefer-default-export
// export { authorReducer };
