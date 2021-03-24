/* eslint-disable quotes */
import axios from 'axios';

const AuthActionType = {
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL'
};

const RegisterAuthAction = (userName) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/signin', { username: userName });
      const { data } = res;
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: {} });
    }
  };
};

const setUser = (data) => ({
  type: 'SET_USER',
  payload: data
});

const logout = () => {
  localStorage.removeItem('user');
  return {
    type: 'LOGOUT'
  };
};

export {
  RegisterAuthAction, AuthActionType, setUser, logout
};
