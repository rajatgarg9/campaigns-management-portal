import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'Components/tabs/tabs.jsx';
import CampaignTable from 'Components/campaignTable/campaignTable.jsx';

import './campaignManagement.scss';

import { daysCalculator, dateFormatSetter } from 'Scripts/utility.js';

import {
  tabList,
  campaignList as campaignListData
} from 'Data/campaignManagementData.js';

function CampaignManagement({ className }) {
  function initializeCampaignList(list) {
    const newList = [];

    for (let i = 0; i < list.length; ++i) {
      const { date } = list[i];

      newList.push({
        ...list[i],
        date: dateFormatSetter(date, 'YYYY-MM-DD'),
        daysDifference: daysCalculator(date, new Date())
      });
    }

    return newList;
  }
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [campaignList, setCampaignList] = useState(
    initializeCampaignList(campaignListData)
  );

  function handleRescheduleCampaign(newDate, index = '') {
    const newCampaignList = [...campaignList];

    newCampaignList[index] = {
      ...newCampaignList[index],
      date: dateFormatSetter(newDate, 'YYYY-MM-DD'),
      daysDifference: daysCalculator(newDate, new Date())
    };

    setCampaignList(newCampaignList);
  }

  function currentTabTable(tableList = [], actionType = '') {
    const actionTypeList = ['future', 'live', 'past'];
    return tableList.filter(({ daysDifference }) => {
      if (actionTypeList[0] === actionType) {
        return daysDifference > 0;
      }
      if (actionTypeList[2] === actionType) {
        return daysDifference < 0;
      }
      return daysDifference === 0;
    });
  }

  return (
    <div className={`cmpignMnagmnt ${className}`}>
      <div className="cmpignMnagmnt__cntntWrap">
        <h2 className="cmpignMnagmnt__hdng">
          <span className="cmpignMnagmnt__hdngSubTxt">Manage</span> Campaigns
        </h2>
        <Tabs
          list={tabList}
          selectedTabIndex={selectedTabIndex}
          handleTabSelection={index => setSelectedTabIndex(index)}
          className="cmpignMnagmnt__tabs"
        />
        <CampaignTable
          campaignList={currentTabTable(
            campaignList,
            tabList[selectedTabIndex].type
          )}
          className="cmpignMnagmnt__cmpignTble"
          handleRescheduleCampaign={handleRescheduleCampaign}
        />
      </div>
    </div>
  );
}

export default CampaignManagement;

CampaignManagement.propTypes = {
  className: PropTypes.string
};

CampaignManagement.defaultProps = {
  className: ''
};
