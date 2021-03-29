import React from 'react';

function Spinner() {
  const style = {
    loadWrapper: {
      marginTop: '2rem',
      marginBottom: '-6.8rem',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  };
  return (
    <div style={style.loadWrapper}>
      <h3>Loading...</h3>
      <div className="ui active centered inline loader" />
    </div>
  );
}

export default Spinner;
