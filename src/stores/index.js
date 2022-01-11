import AuthStore from './AuthStore';
import BooksStore from './BooksStore';

const stores = {
  authStore: new AuthStore(),
  booksStore: new BooksStore()
};

export default stores;