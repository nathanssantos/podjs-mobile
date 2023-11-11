import TrackPlayer, { Event } from 'react-native-track-player';

const playback = async () => {
  TrackPlayer.addEventListener(Event.RemotePause, TrackPlayer.pause);
  TrackPlayer.addEventListener(Event.RemotePlay, TrackPlayer.play);
  TrackPlayer.addEventListener(Event.RemoteNext, TrackPlayer.skipToNext);
  TrackPlayer.addEventListener(Event.RemotePrevious, TrackPlayer.skipToPrevious);
};

export default playback;
