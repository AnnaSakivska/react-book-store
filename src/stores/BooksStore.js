import { action, makeObservable, observable, toJS } from 'mobx';
import axios from 'axios';

export default class BooksStore {
  error = '';

  loading = false;

  books = [];

  constructor() {
    makeObservable(this, {
      error: observable,
      books: observable,
      loading: observable,
      setError: action,
    })
  }

  toggleLoader() {
    this.loading = !this.loading;
  }

  setError(e) {
    this.error = e;
  }

  setBooksData(books) {
    this.books = [
      ...this.books,
      ...books
    ];
  }

  getBooks() {
    return toJS(this.books);
  }

  getLoading() {
    return toJS(this.loading);
  }

  getErrors() {
    return toJS(this.error);
  }

  fetchBooks = async (token) => {
    try {
      this.toggleLoader();
      const res = await axios.get('/books', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = res;

      this.setBooksData(data);
    } catch (error) {
      this.setError(error);
      this.toggleLoader();
    } finally {
      this.toggleLoader();
    }
  };
}
