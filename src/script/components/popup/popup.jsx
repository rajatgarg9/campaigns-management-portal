import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './popup.scss';

function Popup({ children, handleClosePopupCallBack }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  function handlePopupClose(e) {
    if (
      e.target.className.match(/\bpopup\b/, 'g') &&
      handleClosePopupCallBack
    ) {
      handleClosePopupCallBack();
    }
  }
  return (
    <div className="popup" role="presentation" onClick={handlePopupClose}>
      {children}
    </div>
  );
}

export default Popup;

Popup.propTypes = {
  children: PropTypes.element.isRequired,
  handleClosePopupCallBack: PropTypes.func
};

Popup.defaultProps = {
  handleClosePopupCallBack: null
};
