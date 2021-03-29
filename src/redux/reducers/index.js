/* eslint-disable no-case-declarations */
import { combineReducers } from 'redux';
import { AuthActionType, BooksType, cartType, specificBookType } from '../actions';

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
      return {
        ...state,
        loading: true
      };
    case AuthActionType.HIDE_LOADER:
      return {
        ...state,
        loading: false
      };
    case AuthActionType.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
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
    case BooksType.GET_BOOKS_FAIL:
      return {
        ...state,
        error: action.payload,
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

const defaultSpecBookState = {
  book: {},
  loading: false
};

const specificBookReducer = (state = defaultSpecBookState, action) => {
  switch (action.type) {
    case specificBookType.GET_BOOK_SUCC:
      return {
        ...state,
        book: action.payload,
        loading: false
      };
    case specificBookType.GET_BOOK_FAIL:
      return {
        ...state,
        error: action.payload,
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

// Cart reducer
const defaultCartState = {
  books: []
};

const cartReducer = (state = defaultCartState, action) => {
  switch (action.type) {
    case cartType.ADD_BOOK_TO_CART:
      return {
        books: [...state.books, action.payload]
      };
    case cartType.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((item) => item.id !== action.payload)
      };
    case cartType.ADD_AMOUNT_OF_BOOK:
      const bookItem = [...state.books].find((item) => item.id === action.payload.id);
      return {
        books: state.books.map((item) => {
          if (item.id === bookItem.id) {
            return {
              ...item,
              orderedCount: +item.orderedCount + +action.payload.amount
            };
          }
          return item;
        })
      };
    case cartType.DELETE_ALL_BOOKS:
      return {
        books: []
      };
    case 'LOG_OUT':
      return defaultCartState;
    default:
      return state;
  }
};

export default combineReducers({
  authorReducer,
  booksReducer,
  cartReducer,
  specificBookReducer
});
