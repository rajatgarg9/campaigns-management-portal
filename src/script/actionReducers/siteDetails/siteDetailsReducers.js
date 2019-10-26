import Immutable from 'seamless-immutable';

import { globalKeys } from 'Data/globalKeysData.js';

/* eslint-disable import/prefer-default-export */

// default States

const defaultSiteDetails = Immutable({
  language: 'en',
  globalKeys: globalKeys.en,
  languagesList: [
    {
      title: 'English',
      value: 'en'
    },
    {
      title: '日本語',
      value: 'ja'
    }
  ]
});

export const siteDetails = (state = defaultSiteDetails, action) => {
  switch (action.type) {
    case 'SITE_DETAIL_LANGUAGE':
      return Immutable.set(state, 'language', action.payload);
    case 'SITE_DETAIL_GLOBAL_KEYS':
      return Immutable.set(state, 'globalKeys', action.payload);
    default:
      return state;
  }
};
