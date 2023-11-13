import formatMillisecondsToHms from './formatMillisecondsToHms';
import formatSecondsToHms from './formatSecondsToHms';

const formatDuration = (duration: number) => {
  try {
    if (String(duration).includes(':')) return duration;

    if (String(duration).length < 8) return formatSecondsToHms(duration);

    return formatMillisecondsToHms(duration);
  } catch (error) {
    console.error('formatDuration ERROR');
    console.error({ error });

    return String(duration);
  }
};

export default formatDuration;
