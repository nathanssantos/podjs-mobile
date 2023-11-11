import { registerRootComponent } from 'expo';
import { useEffect } from 'react';
import ThemeProvider from './theme/ThemeProvider';
import TrackPlayer from 'react-native-track-player';
import Toast from 'react-native-toast-message';
import playbackService from './services/playback';
import setupPlayer from './services/player';
import PlayerScreen from './screens/PlayerScreen';
import RootStoreProvider from './store/RootStoreProvider';

const App = () => {
  useEffect(() => {
    setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return (
    <RootStoreProvider>
      <ThemeProvider>
        <PlayerScreen />
        <Toast />
      </ThemeProvider>
    </RootStoreProvider>
  );
};

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => playbackService);
