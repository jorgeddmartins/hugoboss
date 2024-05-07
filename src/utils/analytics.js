export const sendCTA = (params, path) => {
  if (!window.gtag) {
    console.error('no gtag found');
    return;
  }
  window.gtag('event', 'cta', {
    ...params,
    page_title: path
  });
};

export const sendEvent = (name, params) => {
  if (!window.gtag) {
    console.error('no gtag found');
    return;
  }
  window.gtag('event', name, {
    ...params
  });
};

export const sendOutbound = (params, path) => {
  if (!window.gtag) {
    console.error('no gtag found');
    return;
  }
  window.gtag('event', 'outbound', {
    ...params,
    page_title: path
  });
};

export const sendPageview = path => {
  if (!window.gtag) {
    console.error('no gtag found');
    return;
  }
  window.gtag('event', 'page_view', {
    page_title: path,
    page_location: path
  });
};

export const consent = () => {
  window.gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted'
  });
};
