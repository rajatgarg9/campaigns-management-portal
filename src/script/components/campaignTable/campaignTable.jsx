import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ActionButton from 'Components/actionButton/actionButton.jsx';
import Calender from 'Components/calender/calender.jsx';
import Popup from 'Components/popup/popup.jsx';
import CampaingnSummryCard from 'Components/campaingnSummryCard/campaingnSummryCard.jsx';

import './campaignTable.scss';

import { dayDifferenceValueHandler } from 'Scripts/utility.js';

function CampaignTable({ campaignList, className, handleRescheduleCampaign }) {
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const globalKeys = useSelector(state => state.siteDetails.globalKeys);

  if (campaignList.length === 0) {
    return null;
  }

  return (
    <div className={`cmpignTble ${className}`}>
      <table className="cmpignTble__tble">
        <thead className="cmpignTble__thead">
          <tr className="cmpignTble__row">
            <th className="cmpignTble__col">{globalKeys.date}</th>
            <th className="cmpignTble__col">{globalKeys.campaign}</th>
            <th className="cmpignTble__col">{globalKeys.view}</th>
            <th className="cmpignTble__col">{globalKeys.actions}</th>
          </tr>
        </thead>
        <tbody>
          {campaignList.map((item, index) => {
            const {
              id = '',
              name = '',
              date = '',
              location = '',
              daysDifference = 0,
              image: { src = '', alt = '' } = {}
            } = item;
            return (
              <tr
                className="cmpignTble__tbody"
                key={id}
                onClick={() => setClickedRowIndex(index)}
              >
                <td className="cmpignTble__col">
                  <div className="cmpignTble__dateDetalWrap">
                    <span className="cmpignTble__date">{date}</span>
                    <span className="cmpignTble__daysDiff">
                      {dayDifferenceValueHandler(
                        daysDifference,
                        globalKeys.daysAgo,
                        globalKeys.daysAhead,
                        globalKeys.today
                      )}
                    </span>
                  </div>
                </td>
                <td className="cmpignTble__col">
                  <div className="cmpignTble__cmpignDtalWrap">
                    <div className="cmpignTble__cmpignImgWrap">
                      <img
                        className="cmpignTble__cmpignImg"
                        src={src}
                        alt={alt || name}
                      />
                    </div>
                    <div className="cmpignTble__nameLocatonWrap">
                      <span className="cmpignTble__name">{name}</span>
                      <span className="cmpignTble__location">{location}</span>
                    </div>
                  </div>
                </td>
                <td className="cmpignTble__col">
                  <div className="cmpignTble__viewCntntWrap">
                    <span className="cmpignTble__viewCurrency">
                      $<span className="cmpignTble__viewCurrencyPlus">+</span>
                    </span>
                    <span className="cmpignTble__viewTxt">
                      {globalKeys.view} <br /> {globalKeys.pricing}
                    </span>
                  </div>
                </td>
                <td className="cmpignTble__col">
                  <div className="cmpignTble__actionsWrap">
                    <ActionButton
                      title={globalKeys.csv}
                      imagePath="images/csvIcon.png"
                      className="cmpignTble__actionsBtnWrap"
                      isDisable
                    />
                    <ActionButton
                      title={globalKeys.report}
                      imagePath="images/reportStatusIcon.jpeg"
                      className="cmpignTble__actionsBtnWrap"
                      isDisable
                    />
                    <ActionButton
                      title={globalKeys.scheduleAgain}
                      imagePath="images/calenderIcon.jpeg"
                      className="cmpignTble__actionsBtnWrap"
                      isDisable={false}
                    >
                      <Calender
                        onDateSelection={handleRescheduleCampaign}
                        propsList={[id]}
                        theme="fixedTop"
                        activeDate={date}
                      />
                    </ActionButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(clickedRowIndex > 0 || clickedRowIndex === 0) && (
        <Popup handleClosePopupCallBack={() => setClickedRowIndex(null)}>
          <CampaingnSummryCard
            {...campaignList[clickedRowIndex]}
            handlePopupClose={() => setClickedRowIndex(null)}
          />
        </Popup>
      )}
    </div>
  );
}

export default CampaignTable;

CampaignTable.propTypes = {
  campaignList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string
      }).isRequired
    })
  ),
  className: PropTypes.string,
  handleRescheduleCampaign: PropTypes.func
};

CampaignTable.defaultProps = {
  campaignList: [],
  className: '',
  handleRescheduleCampaign: null
};
