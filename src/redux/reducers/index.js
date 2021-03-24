import { combineReducers } from 'redux';
import { AuthActionType } from '../actions';

const authState = localStorage.getItem('user') ? { isLoggedIn: true, user: JSON.parse(localStorage.getItem('user')) } : {
  isLoggedIn: false,
  user: {
    username: '',
    avatar: '',
    token: ''
  }
};

const authorReducer = (state = authState, action) => {
  switch (action.type) {
    case AuthActionType.REGISTER_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.payload
      };
    case AuthActionType.REGISTER_FAIL:
      return state;
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  authorReducer
});

// eslint-disable-next-line import/prefer-default-export
// export { authorReducer };
