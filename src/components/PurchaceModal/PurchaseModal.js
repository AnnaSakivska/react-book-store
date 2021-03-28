import React from 'react';
import './PurchaseModal.scss';

// eslint-disable-next-line react/prop-types
function PurchaseModal({ children, trigger, setTrigger, purchaseMsg, onClearCart, reducerBooks }) {
  // on reload the orderd book will disappear
  localStorage.setItem('selectedBooks', JSON.stringify(reducerBooks));
  return (trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <h4>{purchaseMsg}</h4>
        <button
          type="button"
          className="close-btn"
          onClick={() => {
            setTrigger(false);
            onClearCart();
          }}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  ) : '';
}

export default PurchaseModal;
