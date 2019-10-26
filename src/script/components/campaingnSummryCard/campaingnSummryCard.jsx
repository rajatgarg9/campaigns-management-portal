import React from 'react';
import PropTypes from 'prop-types';

import './campaingnSummryCard.scss';

import { dayDifferenceValueHandler } from 'Scripts/utility.js';

function CampaingnSummryCard({
  name,
  date,
  location,
  daysDifference,
  image: { src = '', alt = '' },
  price,
  handlePopupClose
}) {
  function detailItem(heading = '', value = '') {
    return (
      <p className="cmpignSmryCrd__row">
        <span className="cmpignSmryCrd__rowHdng">{heading}</span>
        <span className="cmpignSmryCrd__rowValue">{value}</span>
      </p>
    );
  }

  return (
    <div className="cmpignSmryCrd">
      <h3 className="cmpignSmryCrd__hdng">Campaign Summary</h3>
      <button
        type="button"
        className="cmpignSmryCrd__closBtnWrap"
        onClick={handlePopupClose}
      >
        <span className="cmpignSmryCrd__closBtn" />
      </button>
      <div className="cmpignSmryCrd__cntnt">
        <div className="cmpignSmryCrd__cmpignImgWrap">
          <img className="cmpignSmryCrd__cmpignImg" src={src} alt={alt} />
        </div>
        <div>
          {detailItem('Campaign Name', name)}
          {detailItem('Campaign Date', date)}
          {detailItem(
            'Campaign Days Difference',
            dayDifferenceValueHandler(daysDifference)
          )}
          {detailItem('Campaign Place', location)}
          {detailItem('Campaign Price', price)}
        </div>
      </div>
    </div>
  );
}

export default CampaingnSummryCard;

CampaingnSummryCard.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  daysDifference: PropTypes.number.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  }).isRequired,
  handlePopupClose: PropTypes.func.isRequired
};
