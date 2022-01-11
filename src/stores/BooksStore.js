import { action, makeObservable, observable, toJS } from 'mobx';
import axios from 'axios';

export default class BooksStore {
  error = '';

  loading = false;

  books = {};

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

  // get setBooks() {
  //   return toJS(this.books);
  // }

  get getErrors() {
    return this.error;
  }

  setError(e) {
    this.error = e;
  }

  setBooksData(books) {
    this.books = {
      ...this.books,
      ...books
    };
  }


  getBooks = async (token) => {
    try {
      this.toggleLoader();
      const res = await axios.get('/books', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = res;
      console.log(data);

      this.setBooksData(data);
    } catch (error) {
      this.setError(error)
      console.log(error);
      console.log('sth wrong');
    } finally {
      this.toggleLoader();
    }
  };
}