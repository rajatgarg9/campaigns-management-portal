import React from 'react';

import Header from 'Components/header/header.jsx';
import CampaignManagement from 'Components/campaignManagement/campaignManagement.jsx';

function CampaignListing() {
  return (
    <div>
      <Header className="utility__componentSeprater" />
      <CampaignManagement />
    </div>
  );
}

export default CampaignListing;
