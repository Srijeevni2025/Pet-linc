export const gtagReportConversion = (url) => {
  if (!window.gtag) return;

  const callback = () => {
    if (url) {
      window.location = url;
    }
  };

  window.gtag('event', 'conversion', {
    send_to: 'AW-17990611111/t7A1CJKc2JkcEKfhy4JD',
    event_callback: callback,
  });

  return false;
};