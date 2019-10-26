import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Calendar from 'react-calendar';

import './calender.scss';

function Calender({
  onDateSelection,
  propsList,
  theme,
  callBack2,
  activeDate
}) {
  const [date, setDate] = useState(new Date(activeDate));
  const language = useSelector(state => state.siteDetails.language);

  function onChange(newDate) {
    setDate(newDate);
    onDateSelection(newDate, ...propsList);
    callBack2();
  }

  return (
    <Calendar
      onChange={onChange}
      value={date}
      className={theme ? `react-calendar--${theme}` : ''}
      locale={language}
    />
  );
}

export default Calender;

Calender.propTypes = {
  onDateSelection: PropTypes.func,
  callBack2: PropTypes.func,
  propsList: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  theme: PropTypes.string,
  activeDate: PropTypes.string
};

Calender.defaultProps = {
  onDateSelection: null,
  callBack2: null,
  propsList: [],
  theme: '',
  activeDate: ''
};
