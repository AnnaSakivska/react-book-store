import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import validate from '../validateForm';
// import { RegisterAuthAction } from '../../redux/actions';
import './LogIn.scss';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import login from '../../assets/img/login.jpg';

const LogIn = observer((stores) => {
  const imgUrl = '../../assets/img/login_img.jpg';
  const [name, setName] = useState('');
  const [errors, setErrors] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const dispatch = useDispatch();
  const history = useHistory();
  // const { authorReducer } = useSelector((state) => state);

  // useEffect(() => {
  //   if (isSubmitting) {
  //     // dispatch(RegisterAuthAction(name));
  //     // history.push('/bookscatalog');
  //   }
  //   setIsSubmitting(false);
  // }, [isSubmitting]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setErrors(validate(name, setIsSubmitting));
    console.log(stores.authStore?.getUser);
    stores.authStore?.login(name);
  };

  // {/*if (authorReducer.loading) {*/}
  //   return (
  //     <div className="login__container">
  //       <div className="login">
  //         <Spinner />
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      {stores.authStore?.getErrors && <ErrorMessage errorMsg={stores.authStore?.getErrors} />}
      <div className="login__container">
        <div className="login">
          <img className="ui medium rounded image login__img" alt="log in img" src={login} />
          <h3 className="welcome-text">Welcome to JS Band Book Store!</h3>
          <form className="ui form login__form" onSubmit={handleSubmit}>
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
    </>
  );
});

export default inject('stores')(LogIn);
