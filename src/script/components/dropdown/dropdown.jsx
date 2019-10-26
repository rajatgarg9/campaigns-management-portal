import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './dropdown.scss';

function Dropdown({ optionList, selectedValue, onChangeCb, className }) {
  const [currentValue, setCurrentValue] = useState(selectedValue);

  if (!optionList || optionList.length === 0) {
    return null;
  }

  return (
    <div className={`dropDwn ${className}`}>
      <select
        className="dropDwn__slct"
        value={currentValue}
        onChange={event => {
          setCurrentValue(event.target.value);
          onChangeCb(event.target.value);
        }}
      >
        {optionList.map(({ value, title }) => (
          <option value={value} className="dropDwn__opton" key={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  className: PropTypes.string,
  onChangeCb: PropTypes.func,
  selectedValue: PropTypes.string.isRequired,
  optionList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

Dropdown.defaultProps = {
  className: '',
  onChangeCb: null
};
