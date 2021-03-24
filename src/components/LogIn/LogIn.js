import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import validate from '../validateInfo';
import { RegisterAuthAction } from '../../redux/actions';
import './LogIn.scss';

function LogIn() {
  const imgUrl = 'https://source.unsplash.com/1600x900/?javascript?programming';
  const [name, setName] = useState('');
  const [errors, setErrors] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isSubmitting) {
      dispatch(RegisterAuthAction(name));
      history.push('/bookscatalog');
    }
    setIsSubmitting(false);
  }, [isSubmitting]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setErrors(validate(name, setIsSubmitting));
  };

  return (
    <div className="login__container">
      <div className="login">
        <img className="ui medium bordered image login__img" alt="log in img" src={imgUrl} />
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name__login">
              Name:
              <input
                className="input__login"
                id="name__login"
                type="text"
                name="first-name"
                placeholder="Log-in Name"
                value={name}
                // eslint-disable-next-line no-unused-expressions
                onKeyPress={(ev) => { ev.key === 'Enter' && ev.preventDefault(); }}
                onClick={(ev) => setErrors('')}
                onChange={(ev) => setName(ev.target.value)}
              />
              {errors && <p>{errors}</p>}
            </label>
            <button className="teal fluid ui button" type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// const mapStateToProps = (name) => {
//   return {
//     username: name
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     register: (name, isSubmitting) => {
//       dispatch(RegisterAuthAction(name));
//       // if (isSubmitting) {
//       console.log('working');
//       // }
//     }
//   };
// };

export default LogIn;
