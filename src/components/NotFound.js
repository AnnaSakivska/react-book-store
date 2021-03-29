import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="ui grid middle aligned segment teal inverted" style={{ height: '100vh', margin: '0' }}>
      <div className="ui column center aligned">
        <div className="ui inverted statistic">
          <div className="value">404</div>
          <div className="label">Error</div>
        </div>

        <div className="ui message teal inverted">
          <div className="header">Page not found</div>
          <p>Oops...The link you clicked may be broken or the page may have been removed. We’re sorry.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
