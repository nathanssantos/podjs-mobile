const formatMillisecondsToHms = (milliseconds: number) => {
  try {
    const date = new Date(1000 * Math.round(milliseconds / 1000));
    const pad = (value: number) => ('0' + value).slice(-2);

    return date.getUTCHours() + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds());
  } catch (error) {
    console.error('formatMillisecondsToHms');
    console.log({ error });

    return String(milliseconds);
  }
};

export default formatMillisecondsToHms;
