import { action, makeObservable, observable, toJS } from 'mobx';
import axios from 'axios';

export default class AuthStore {
  isLoggedIn = false;

  error = '';

  loading = false;

  token = 0;

  user = {
    username: '',
    avatar: '',
    token: ''
  }

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      error: observable,
      user: observable,
      token: observable,
      loading: observable,
      setError: action,
      setUserData: action,
    })
  }

  setUserData(user) {
    this.user = {
      ...this.user,
      ...user
    };
  }

  get getUser() {
    return toJS(this.user);
  }

  get authStatus() {
    return this.isLoggedIn;
  }

  get getErrors() {
    return this.error;
  }

  setError(e) {
    this.error = e;
  }

  toggleLoader() {
    this.loading = !this.loading;
  }

  login = async (userName) => {
    try {
      this.toggleLoader();
      const res = await axios.post('/signin', { username: userName });
      const { data } = res;
      this.setUserData(data);
      console.log(JSON.stringify(res.data));
      localStorage.setItem('user', JSON.stringify(res.data));
      // this.token = JSON.stringify(res.data).token;
      this.isLoggedIn = 'true';
    } catch (error) {
      this.setError(error)
      console.log(error);
      this.isLoggedIn = 'false';
    } finally {
      this.toggleLoader();
    }
  }
}
