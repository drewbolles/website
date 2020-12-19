export const GA_TRACKING_ID = 'UA-36427500-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.ga('send', 'pageview', url);
};
