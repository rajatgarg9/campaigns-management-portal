import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch, batch } from 'react-redux';

import Dropdown from 'Components/dropdown/dropdown.jsx';

import {
  languageAction,
  globalKeysAction
} from 'Scripts/actionReducers/siteDetails/siteDetailsActions.js';

import { globalKeys as globalKeysAllLang } from 'Data/globalKeysData.js';

import './header.scss';

function Header({ className }) {
  const globalKeys = useSelector(state => state.siteDetails.globalKeys);
  const languagesList = useSelector(state => state.siteDetails.languagesList);
  const languages = useSelector(state => state.siteDetails.language);
  const dispatch = useDispatch();

  return (
    <header className={`hadr ${className}`}>
      <div className="hadr__contntWrap">
        <div className="hadr__mainContnt">
          <div className="hadr__leftSec">
            <div className="hadr__logoImgWrap">
              <img src="images/logo.png" alt="logo" className="hadr__logoImg" />
            </div>
            <span className="hadr__logoTxt">
              {globalKeys.spotlight}{' '}
              <span className="hadr__subTxt">{globalKeys.byBlueStacks}</span>
            </span>
          </div>
          <div className="hadr__rightSec">
            <span className="hadr__appState">{globalKeys.beta}</span>
            <Dropdown
              selectedValue={languages}
              optionList={languagesList}
              onChangeCb={value => {
                batch(() => {
                  dispatch(languageAction(value));
                  dispatch(globalKeysAction(globalKeysAllLang[value]));
                });
              }}
              className="hadr__dropDown"
            />
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
