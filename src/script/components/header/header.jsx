import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

function Header({ className }) {
  return (
    <header className={`hadr ${className}`}>
      <div className="hadr__contntWrap">
        <div className="hadr__mainContnt">
          <div className="hadr__leftSec">
            <div className="hadr__logoImgWrap">
              <img src="images/logo.png" alt="logo" className="hadr__logoImg" />
            </div>
            <span className="hadr__logoTxt">
              Spotlight <span className="hadr__subTxt">by BlueStacks</span>
            </span>
          </div>
          <div className="hadr__rightSec">
            <span className="hadr__appState">BETA</span>
          </div>
        </div>
        <button className="hadr__actionButton" type="button">
          <span className="hadr__actionButtonLne" />
          <span className="hadr__actionButtonLne" />
          <span className="hadr__actionButtonLne" />
        </button>
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  className: PropTypes.string
};

Header.defaultProps = {
  className: ''
};
