import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { DarkTheme } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import playbackService from './services/playback';
import RootStoreProvider from './store/RootStoreProvider';
import ThemeProvider from './theme/ThemeProvider';
import Router from './router/Router';

const App = () => {
  useEffect(() => {
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <RootStoreProvider>
        <ThemeProvider>
          <Router />
          <Toast />
        </ThemeProvider>
      </RootStoreProvider>
    </NavigationContainer>
  );
};

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => playbackService);
