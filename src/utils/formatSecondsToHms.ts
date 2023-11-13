const formatSecondsToHms = (seconds: number) => {
  try {
    const date = new Date(0);
    date.setSeconds(seconds);

    return date.toISOString().split('T')[1].split('.')[0];
  } catch (error) {
    console.error('formatSecondsToHms ERROR');
    console.error({ error });

    return String(seconds);
  }
};

export default formatSecondsToHms;
