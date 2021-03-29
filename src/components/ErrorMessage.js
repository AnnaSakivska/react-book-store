import React from 'react';

function ErrorMessage({ errorMsg }) {
  const style = {
    errorWrapper: {
      width: '100%',
      display: 'flex',
      height: '4rem',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fa5353',
      fontSize: '18px',
      marginBottom: '-4rem'
    },
    errorMsg: {
      marginLeft: '1rem',
      fontStyle: 'italic',
      fontSize: '16px'

    }
  };

  return (
    <div className="author-error__wrapper" style={style.errorWrapper}>
      <p className="author-error">
        Something went wrong!
        <span style={style.errorMsg}>{`Error message: ${errorMsg}`}</span>
      </p>
    </div>
  );
}

export default ErrorMessage;
