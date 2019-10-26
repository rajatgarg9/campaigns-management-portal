import React from 'react';
import PropTypes from 'prop-types';

import './tabs.scss';

function Tabs({ list, className, selectedTabIndex, handleTabSelection }) {
  return (
    <>
      {list.length > 0 && (
        <ul className={`tabs ${className}`}>
          {list.map(({ title }, index) => (
            <li
              key={title}
              className={`tabs__item ${
                selectedTabIndex === index ? 'tabs__item--selected' : ''
              }`}
            >
              <button
                onClick={() => handleTabSelection && handleTabSelection(index)}
                type="button"
                className="tabs__itemBtn"
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Tabs;

Tabs.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  ),
  className: PropTypes.string,
  selectedTabIndex: PropTypes.number,
  handleTabSelection: PropTypes.func.isRequired
};

Tabs.defaultProps = {
  list: [],
  className: '',
  selectedTabIndex: 0
};
