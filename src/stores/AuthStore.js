import { action, makeObservable, observable, toJS } from 'mobx';
import axios from 'axios';

export default class AuthStore {
  isLoggedIn = false;

  error = '';

  loading = false;

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
    } catch (error) {
      this.setError(error)
      console.log(error);
    } finally {
      this.toggleLoader();
    }
  }
}
