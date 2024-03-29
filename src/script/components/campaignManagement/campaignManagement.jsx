import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Tabs from 'Components/tabs/tabs.jsx';
import CampaignTable from 'Components/campaignTable/campaignTable.jsx';

import './campaignManagement.scss';

import { daysCalculator, dateFormatSetter } from 'Scripts/utility.js';

import {
  tabList,
  campaignList as campaignListData
} from 'Data/campaignManagementData.js';

function CampaignManagement({ className }) {
  const language = useSelector(state => state.siteDetails.language);
  const globalKeys = useSelector(state => state.siteDetails.globalKeys);
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
    initializeCampaignList(campaignListData[language])
  );

  useEffect(() => {
    setCampaignList(initializeCampaignList(campaignListData[language]));
  }, [language]);

  function handleRescheduleCampaign(newDate, actionId = '') {
    const newCampaignList = [];

    for (let i = 0; i < campaignList.length; ++i) {
      const { id } = campaignList[i];
      if (id === actionId) {
        newCampaignList.push({
          ...campaignList[i],
          date: dateFormatSetter(newDate, 'YYYY-MM-DD'),
          daysDifference: daysCalculator(newDate, new Date())
        });
      } else {
        newCampaignList.push({
          ...campaignList[i]
        });
      }
    }

    setCampaignList(newCampaignList);
  }

  function currentTabTable(tableList = [], actionType = '') {
    const actionTypeList = ['future', 'live', 'past'];
    return tableList.filter(({ daysDifference }) => {
      if (actionTypeList[0] === actionType) {
        return daysDifference < 0;
      }
      if (actionTypeList[2] === actionType) {
        return daysDifference > 0;
      }
      return daysDifference === 0;
    });
  }

  return (
    <div className={`cmpignMnagmnt ${className}`}>
      <div className="cmpignMnagmnt__cntntWrap">
        <h2 className="cmpignMnagmnt__hdng">
          <span className="cmpignMnagmnt__hdngSubTxt">{globalKeys.manage}</span>{' '}
          {globalKeys.campaigns}
        </h2>
        <Tabs
          list={tabList[language]}
          selectedTabIndex={selectedTabIndex}
          handleTabSelection={index => setSelectedTabIndex(index)}
          className="cmpignMnagmnt__tabs"
        />
        <CampaignTable
          campaignList={currentTabTable(
            campaignList,
            tabList[language][selectedTabIndex].type
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
