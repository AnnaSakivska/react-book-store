import AuthStore from './AuthStore';
import BooksStore from './BooksStore';
import BookDetailsStore from './BookDetailsStore';

const stores = {
  authStore: new AuthStore(),
  booksStore: new BooksStore(),
  bookDetailsStore: new BooksStore()
};

export default stores;
