import { action, makeObservable, observable, toJS } from 'mobx';
import axios from 'axios';

export default class BookDetailsStore {
  error = '';

  loading = false;

  bookDetailData = {};

  constructor() {
    makeObservable(this, {
      error: observable,
      bookDetailData: observable,
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

  getLoading() {
    return toJS(this.loading);
  }

  getErrors() {
    return toJS(this.error);
  }

  getBookDetails() {
    return toJS(this.bookDetailData);
  }

  setBookDetails(details) {
    this.bookDetailData = [
      ...this.bookDetailData,
      ...details
    ];
  }

  fetchBookDetails = async (token = '', id) => {
    try {
      const res = await axios.get(`https://js-band-store-api.glitch.me/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = res;

      this.setBookDetails(data);
    } catch (error) {
      this.setError(error);
      this.toggleLoader();
    } finally {
      this.toggleLoader();
    }
  }
}
