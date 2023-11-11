import { registerRootComponent } from 'expo';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import TrackPlayer from 'react-native-track-player';
import PlayerScreen from './screens/PlayerScreen';
import playbackService from './services/playback';
import RootStoreProvider from './store/RootStoreProvider';
import ThemeProvider from './theme/ThemeProvider';

const App = () => {
  useEffect(() => {
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
